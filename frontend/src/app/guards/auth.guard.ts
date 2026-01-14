import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();
  const role = auth.getRole();
  const expectedRole = route.data?.['role'];

  // 🔒 Non connecté
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // 🎭 Mauvais rôle
  if (expectedRole && role !== expectedRole) {
    if (role === 'SELLER') {
      router.navigate(['/dashboard']);
    } else {
      router.navigate(['/buyer-dashboard']);
    }
    return false;
  }

  return true;
};
