import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';

/**
 * Interface correspondant EXACTEMENT à la réponse backend
 */
interface UserProfileResponse {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: 'SELLER' | 'BUYER' | 'ADMIN';
  location: string | null;
  createdAt: string | null;
  profilePhoto: string | null;
}

/**
 * Interface utilisée par le frontend
 * (alignée avec les composants existants)
 */
export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: 'SELLER' | 'BUYER' | 'ADMIN';

  // Champs utilisés par ProfileComponent
  city?: string;
  country?: string;

  // Champs bruts
  location?: string | null;
  createdAt?: string | null;
  profilePhoto?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/api/users';

  // Cache utilisateur connecté - exposé comme Observable
  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  public user$ = this.userSubject.asObservable();

  // Flag pour éviter les double-chargements
  private isLoadingCurrentUser = false;

  // Cache utilisateurs par ID (évite les appels multiples)
  private usersByIdCache = new Map<number, UserProfile>();

  // Cache utilisateurs par rôle
  private usersByRoleCache = new Map<'SELLER' | 'BUYER' | 'ADMIN', UserProfile[]>();

  constructor(private http: HttpClient) {}

  /**
   * Transforme la réponse backend en UserProfile
   */
  private mapToUserProfile(response: UserProfileResponse): UserProfile {
    let city: string | undefined;
    let country: string | undefined;

    if (response.location) {
      const parts = response.location.split(',').map((s) => s.trim());
      city = parts[0];
      country = parts[1];
    }

    return {
      id: response.id,
      fullName: response.fullName,
      email: response.email,
      phone: response.phone,
      role: response.role,
      city,
      country,
      location: response.location,
      createdAt: response.createdAt,
      profilePhoto: response.profilePhoto,
    };
  }

  /**
   * Récupère l'utilisateur connecté (appelé une fois à l'app init)
   * REACTIVE : retourne un Observable fiable, déclenche le chargement UNE SEULE FOIS
   * Si déjà chargé ou en cours → retourner le cache
   */
  loadCurrentUser(): Observable<UserProfile> {
    // Si déjà en cache → retour immédiat
    if (this.userSubject.value) {
      return new Observable((observer) => {
        observer.next(this.userSubject.value as UserProfile);
        observer.complete();
      });
    }

    // Si déjà en cours de chargement → éviter double-appel
    if (this.isLoadingCurrentUser) {
      return this.user$.pipe(
        filter((user: UserProfile | null): user is UserProfile => user !== null),
      );
    }

    // 🔴 DÉCLENCHER LE CHARGEMENT UNE SEULE FOIS
    this.isLoadingCurrentUser = true;

    return this.http.get<UserProfileResponse>(`${this.API_URL}/me`).pipe(
      map((response) => this.mapToUserProfile(response)),
      tap((user) => {
        this.userSubject.next(user);
        this.isLoadingCurrentUser = false;
      }),
      catchError((error) => {
        this.isLoadingCurrentUser = false;
        console.error('UserService - Erreur loadCurrentUser:', error);
        throw error;
      }),
    );
  }

  /**
   * Retourne l'utilisateur connecté actuel (sync)
   */
  getCurrentUser(): UserProfile | null {
    return this.userSubject.value;
  }

  /**
   * Récupère un utilisateur par ID (avec cache local)
   */
  getUserById(id: number): Observable<UserProfile> {
    // Stratégie cache-first : vérifier le cache local
    const cached = this.usersByIdCache.get(id);
    if (cached) {
      return new Observable((observer) => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.http.get<UserProfileResponse>(`${this.API_URL}/${id}`).pipe(
      map((response) => this.mapToUserProfile(response)),
      tap((user) => this.usersByIdCache.set(id, user)),
      catchError((error) => {
        console.error(`UserService - Erreur GET /users/${id}:`, error);
        throw error;
      }),
    );
  }

  /**
   * Récupère les utilisateurs par rôle (avec cache)
   */
  getUsersByRole(role: 'SELLER' | 'BUYER' | 'ADMIN'): Observable<UserProfile[]> {
    // Stratégie cache-first
    const cached = this.usersByRoleCache.get(role);
    if (cached) {
      return new Observable((observer) => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.http.get<UserProfileResponse[]>(`${this.API_URL}/role/${role}`).pipe(
      map((responses) => responses.map((r) => this.mapToUserProfile(r))),
      tap((users) => this.usersByRoleCache.set(role, users)),
      catchError((error) => {
        console.error(`UserService - Erreur GET /users/role/${role}:`, error);
        throw error;
      }),
    );
  }

  /**
   * Recherche un utilisateur par email ou téléphone
   */
  searchUser(params: { email?: string; phone?: string }): Observable<UserProfile | null> {
    const queryParams = new URLSearchParams();
    if (params.email) queryParams.append('email', params.email);
    if (params.phone) queryParams.append('phone', params.phone);

    return this.http
      .get<UserProfileResponse | null>(`${this.API_URL}/search?${queryParams.toString()}`)
      .pipe(
        map((response) => (response ? this.mapToUserProfile(response) : null)),
        catchError((error) => {
          console.error('UserService - Erreur search:', error);
          // Ne pas throw : retourner null si non trouvé
          return new Observable<null>((observer) => {
            observer.next(null);
            observer.complete();
          });
        }),
      );
  }

  /**
   * Nettoyage (logout)
   */
  clearUser(): void {
    this.userSubject.next(null);
    this.usersByIdCache.clear();
    this.usersByRoleCache.clear();
  }

  /**
   * Met à jour l'utilisateur via PUT /api/users/me
   */
  updateUser(user: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfileResponse>(`${this.API_URL}/me`, user).pipe(
      map((response) => this.mapToUserProfile(response)),
      tap((updatedUser) => {
        // Mettre à jour le cache local
        this.userSubject.next(updatedUser);
        // Mettre à jour le cache par ID si applicable
        if (updatedUser.id) {
          this.usersByIdCache.set(updatedUser.id, updatedUser);
        }
      }),
      catchError((error) => {
        console.error('UserService - Erreur updateUser:', error);
        throw error;
      }),
    );
  }

  /**
   * Met à jour le cache utilisateur (après modification réussie)
   */
  updateUserCache(user: UserProfile): void {
    this.userSubject.next(user);
    if (user.id) {
      this.usersByIdCache.set(user.id, user);
    }
  }

  uploadProfilePhoto(file: File): Observable<UserProfile> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UserProfileResponse>(`${this.API_URL}/me/photo`, formData).pipe(
      map((response) => this.mapToUserProfile(response)),
      tap((updatedUser) => {
        this.userSubject.next(updatedUser);
        if (updatedUser.id) {
          this.usersByIdCache.set(updatedUser.id, updatedUser);
        }
      }),
      catchError((error) => {
        console.error('UserService - Erreur uploadProfilePhoto:', error);
        throw error;
      }),
    );
  }
}
