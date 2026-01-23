import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideIcons } from '@ng-icons/core';
import {
  heroArrowRightOnRectangle,
  heroBars3,
  heroShoppingCart,
  heroUserPlus,
} from '@ng-icons/heroicons/outline';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    // ✅ Ajout ng-icons (sans rien casser)
    provideIcons({
      heroShoppingCart,
      heroUserPlus,
      heroArrowRightOnRectangle,
      heroBars3,
    }),
  ],
};
