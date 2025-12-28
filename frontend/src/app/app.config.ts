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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // ✅ Ajout ng-icons (sans rien casser)
    provideIcons({
      heroShoppingCart,
      heroUserPlus,
      heroArrowRightOnRectangle,
      heroBars3,
    }),
  ],
};
