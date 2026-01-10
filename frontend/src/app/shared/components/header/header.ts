import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {

  menuOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  /** 🔐 Auth state */
  get isLoggedIn(): boolean {
    return !!this.auth.getToken();
  }

  /** 🎭 Rôle utilisateur */
  get role(): string | null {
    return this.auth.getRole();
  }

  /** 🎯 Dashboard selon rôle */
  get dashboardRoute(): string {
    return this.role === 'SELLER'
      ? '/dashboard'
      : '/buyer-dashboard';
  }

  /** 🚪 Déconnexion */
  logout() {
    this.auth.logout();
    this.closeMenu();
    this.router.navigate(['/login']);
  }
}
