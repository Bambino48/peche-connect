import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.scss',
})
export class ProfileEditComponent {
  user = {
    full_name: 'Nom complet',
    phone: '0700000000',
    email: 'email@example.com',
    location: '',
    profile_photo: '',
  };

  previewPhoto: string | null = null;

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.previewPhoto = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  saveProfile() {
    console.log('Profil à sauvegarder :', this.user);
  }

  cancel() {
    window.history.back();
  }
}
