import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

/**
 * Interface pour la réponse du backend lors du login
 */
interface LoginResponse {
  token: string;
  role: 'SELLER' | 'BUYER' | 'ADMIN';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}
  /** 🔐 Inscription */
  register(payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, payload);
  }

  /** 🔐 Connexion */
  login(payload: { phone: string; password: string }): Observable<LoginResponse> {
    // 🔴 CRITIQUE : vider le cache utilisateur AVANT de stocker le nouveau token
    this.userService.clearUser();

    return this.http.post<LoginResponse>(`${this.API_URL}/login`, payload).pipe(
      tap((response: LoginResponse) => {
        console.log('[AuthService] Login réussi, stockage token');
        // Token reçu → le sauvegarder
        this.saveToken(response.token);
        this.saveRole(response.role);
      }),
    );
  }

  /** 💾 Token */
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** 🎭 Rôle */
  saveRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  /** 🚪 Déconnexion */
  logout(): void {
    console.log('[AuthService] Logout, nettoyage du cache utilisateur');
    // 🔴 CRITIQUE : vider le cache utilisateur lors de la déconnexion
    this.userService.clearUser();

    // Supprimer le token du stockage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
