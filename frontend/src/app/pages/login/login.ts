import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {

  phone = '';
  password = '';

  loading = false;
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    const payload = {
      phone: this.phone,
      password: this.password,
    };

    this.auth.login(payload).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.auth.saveRole(res.role);

        // 🔀 Redirection selon rôle
        if (res.role === 'SELLER') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/buyer-dashboard']);
        }
      },
      error: () => {
        this.errorMessage = 'Téléphone ou mot de passe incorrect';
        this.loading = false;
      }
    });
  }
}
