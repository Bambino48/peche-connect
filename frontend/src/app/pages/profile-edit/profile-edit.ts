import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserProfile, UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.scss',
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  // Formulaire réactif
  profileForm!: FormGroup;

  // État
  isLoading = true;
  isSaving = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  previewPhoto: string | null = null;
  isUploadingPhoto = false;
  selectedPhotoFile: File | null = null;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimeoutId: ReturnType<typeof setTimeout> | null = null;

  private readonly PROFILE_PHOTO_BASE_URL = 'http://localhost:8080/uploads/profile-photos';

  // Données originales (pour comparer les changements)
  originalUser: UserProfile | null = null;

  // Cleanup
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    console.log('[ProfileEditComponent] init');
    this.loadUserData();
  }

  /**
   * Initialise le FormGroup vide
   */
  private initializeForm(): void {
    this.profileForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', []],
    });
  }

  /**
   * Charge les données réelles de l'utilisateur
   */
  private loadUserData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    // Étape 1 : vérifier si utilisateur en cache
    let currentUser = this.userService.getCurrentUser();

    // Étape 2 : si pas en cache, le charger
    if (!currentUser) {
      this.userService
        .loadCurrentUser()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user: UserProfile) => {
            console.log('[ProfileEditComponent] User loaded:', user.fullName);
            this.populateForm(user);
            this.isLoading = false;
          },
          error: (err) => {
            console.error('[ProfileEditComponent] Error loading user:', err);
            this.errorMessage = err?.error?.message || 'Erreur lors du chargement du profil.';
            this.isLoading = false;
          },
        });
    } else {
      // Utiliser le cache
      console.log('[ProfileEditComponent] Using cached user:', currentUser.fullName);
      this.populateForm(currentUser);
      this.isLoading = false;
    }
  }

  /**
   * Remplit le formulaire avec les données utilisateur
   */
  private populateForm(user: UserProfile): void {
    this.originalUser = { ...user };

    this.profileForm.patchValue({
      fullName: user.fullName || '',
      phone: user.phone || '',
      email: user.email || '',
      location: user.location || '',
    });

    // Afficher la photo si elle existe
    if (user.profilePhoto) {
      this.previewPhoto = `${this.PROFILE_PHOTO_BASE_URL}/${user.profilePhoto}`;
    }
  }

  /**
   * Gère la sélection d'une photo
   */
  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.selectedPhotoFile = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.previewPhoto = reader.result as string;
      console.log('[ProfileEditComponent] Photo preview updated');
    };

    reader.readAsDataURL(file);
  }

  /**
   * Upload de la photo via multipart/form-data
   */
  uploadPhoto(): void {
    if (!this.selectedPhotoFile) {
      return;
    }

    this.isUploadingPhoto = true;
    this.errorMessage = null;

    this.userService
      .uploadProfilePhoto(this.selectedPhotoFile)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedUser: UserProfile) => {
          this.isUploadingPhoto = false;
          this.userService.updateUserCache(updatedUser);

          if (updatedUser.profilePhoto) {
            this.previewPhoto = `${this.PROFILE_PHOTO_BASE_URL}/${updatedUser.profilePhoto}`;
          }

          this.triggerToast('Photo de profil mise à jour avec succès', 'success');
        },
        error: (err) => {
          console.error('[ProfileEditComponent] Error uploading photo:', err);
          this.isUploadingPhoto = false;
          this.errorMessage = err?.error?.message || 'Erreur lors du téléchargement de la photo.';
          const message = this.errorMessage ?? 'Erreur lors du téléchargement de la photo.';
          this.triggerToast(message, 'error');
        },
        complete: () => {
          this.isUploadingPhoto = false;
        },
      });
  }

  private triggerToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
    }

    this.toastTimeoutId = setTimeout(() => {
      this.showToast = false;
    }, 2500);
  }

  /**
   * Récupère les champs modifiés (diff)
   */
  private getModifiedFields(): Partial<UserProfile> {
    if (!this.originalUser) return {};

    const formValue = this.profileForm.value;
    const modified: Partial<UserProfile> = {};

    // Comparer chaque champ
    if (formValue.fullName !== this.originalUser.fullName) {
      modified.fullName = formValue.fullName;
    }
    if (formValue.phone !== this.originalUser.phone) {
      modified.phone = formValue.phone;
    }
    if (formValue.email !== this.originalUser.email) {
      modified.email = formValue.email;
    }
    if (formValue.location !== this.originalUser.location) {
      modified.location = formValue.location;
    }

    return modified;
  }

  /**
   * Sauvegarde le profil
   */
  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Veuillez corriger les erreurs du formulaire.';
      return;
    }

    const modifiedFields = this.getModifiedFields();

    // Si aucun changement
    if (Object.keys(modifiedFields).length === 0) {
      console.log('[ProfileEditComponent] No changes detected');
      this.successMessage = 'Aucun changement à enregistrer.';
      setTimeout(() => this.router.navigate(['/profile']), 1500);
      return;
    }

    console.log('[ProfileEditComponent] Saving changes:', modifiedFields);
    this.isSaving = true;
    this.errorMessage = null;
    this.successMessage = null;

    // Créer un objet complèt pour mettre à jour le cache
    const updatedUser: UserProfile = {
      ...this.originalUser!,
      ...modifiedFields,
    };

    // Appeler le service pour mettre à jour
    this.userService
      .updateUser(updatedUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (responseUser: UserProfile) => {
          console.log('[ProfileEditComponent] User updated successfully:', responseUser.fullName);

          // Mettre à jour le cache utilisateur
          this.userService.updateUserCache(responseUser);

          this.isSaving = false;
          this.successMessage = '✅ Profil mis à jour avec succès !';

          // Rediriger après 1.5s
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 1500);
        },
        error: (err) => {
          console.error('[ProfileEditComponent] Error updating user:', err);
          this.isSaving = false;
          this.errorMessage = err?.error?.message || 'Erreur lors de la mise à jour du profil.';
        },
      });
  }

  /**
   * Annule et revient à la page précédente
   */
  cancel(): void {
    this.router.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
