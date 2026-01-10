import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideIcons } from '@ng-icons/core';
import {
  heroShoppingCart,
  heroUserPlus,
  heroArrowRightOnRectangle,
  heroBars3,
} from '@ng-icons/heroicons/outline';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
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
