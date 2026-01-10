import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {

  loading = false;
  errorMessage = '';
  successMessage = '';

  formData = {
    fullName: '',
    phone: '',
    email: '',
    password: '',
    role: '',
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.auth.register(this.formData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Inscription réussie. Redirection vers la connexion...';

        // ⏳ Redirection après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Erreur lors de la création du compte';
      }
    });
  }
}
