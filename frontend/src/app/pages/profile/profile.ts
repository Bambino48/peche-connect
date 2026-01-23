import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { UserProfile, UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  // SOURCE DE VÉRITÉ : l'utilisateur
  // user !== null = profil prêt à afficher
  user: UserProfile | null = null;

  // État UX secondaire (utilisé uniquement si user === null)
  isLoading = true;
  errorMessage: string | null = null;

  // Données de fallback + avatar par défaut garanti
  private fallbackUser = {
    fullName: 'Nom complet',
    email: 'email@example.com',
    phone: '0700000000',
    city: 'Ville',
    country: 'Pays',
    role: 'SELLER' as const,
    profilePhoto: null,
    createdAt: new Date().toISOString(),
  };

  // Avatar par défaut (SVG inline pour zéro 404)
  private readonly DEFAULT_AVATAR =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSIjYmJiIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjMwIiByPSIyNSIvPjxwYXRoIGQ9Ik0wIDcwYzAtMjAgMzAtMzAgNTAtMzAgMjAgMCA1MCAxMCA1MCAzMFY5MEgweiIvPjwvc3ZnPg==';

  private readonly PROFILE_PHOTO_BASE_URL = 'http://localhost:8080/uploads/profile-photos';

  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('[ProfileComponent] init');

    // ✅ S'ABONNER À user$ - source de vérité ABSOLUE
    this.userService.user$
      .pipe(
        takeUntil(this.destroy$),
        tap((user: UserProfile | null) => {
          if (user) {
            console.log('[ProfileComponent] user$ updated:', user.fullName);
            this.user = user;
            this.isLoading = false;
            this.errorMessage = null;
          } else {
            console.log('[ProfileComponent] user$ cleared (logout)');
            this.user = null;
            // Vider aussi l'erreur lors du logout
            this.errorMessage = null;
          }
          // Forcer la détection de changement Angular
          this.cdr.markForCheck();
        }),
      )
      .subscribe();

    // ✅ Si pas d'utilisateur en cache → charger depuis le backend
    // NE PAS utiliser le cache - il peut être obsolète
    if (!this.userService.getCurrentUser()) {
      console.log('[ProfileComponent] No cached user, loading from backend');
      this.loadUserProfile();
    }
  }

  /**
   * Charge le profil depuis le backend UNE SEULE FOIS
   * Le UserService mettra à jour user$ via tap()
   * Le composant s'abonne à user$ donc se met à jour automatiquement
   */
  private loadUserProfile(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.userService
      .loadCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: UserProfile) => {
          console.log('[ProfileComponent] loadCurrentUser success:', user.fullName);
          // user$ subscriber met à jour this.user automatiquement via tap()
          // donc pas d'assignation supplémentaire nécessaire
        },
        error: (err) => {
          console.error('[ProfileComponent] loadCurrentUser error:', err);
          this.isLoading = false;
          this.errorMessage =
            err?.error?.message || 'Erreur lors du chargement du profil. Veuillez réessayer.';
          this.cdr.markForCheck();
        },
      });
  }

  /**
   * Getters pour accéder facilement aux données dans le template
   * (simplifie les bindings Angular)
   */
  get fullName(): string {
    return this.user?.fullName || this.fallbackUser.fullName;
  }

  get email(): string {
    return this.user?.email || this.fallbackUser.email;
  }

  get phone(): string {
    return this.user?.phone || this.fallbackUser.phone;
  }

  get location(): string {
    return this.user?.location || 'Non renseigné';
  }

  get role(): string {
    return this.user?.role || this.fallbackUser.role;
  }

  get profilePhoto(): string {
    return this.user?.profilePhoto || '';
  }

  /**
   * Avatar URL avec fallback : image utilisateur ou SVG par défaut
   */
  get avatarUrl(): string {
    return this.user?.profilePhoto && this.user.profilePhoto.trim()
      ? `${this.PROFILE_PHOTO_BASE_URL}/${this.user.profilePhoto}`
      : this.DEFAULT_AVATAR;
  }

  /**
   * Handler erreur image : fallback si URL distante 404
   */
  onAvatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.DEFAULT_AVATAR;
  }

  get createdAtYear(): string {
    if (!this.user?.createdAt) return '—';
    return new Date(this.user.createdAt).getFullYear().toString();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
