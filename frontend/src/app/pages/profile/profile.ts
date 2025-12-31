import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe,CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileComponent {
  user = {
    full_name: 'Nom complet',
    email: 'email@example.com',
    phone: '0700000000',
    location: 'Ville, Pays',
    role: 'SELLER',
    profile_photo: 'assets/avatar.png',
    created_at: '2025-01-01',
  };
}
