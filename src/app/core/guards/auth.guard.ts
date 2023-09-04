import { CanActivate, CanActivateFn, Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.services';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated().pipe(
    map((isAuth) => {
      // SI ESTA AUTENTICADO LO DEJO VER LA PANTALLA...
      if (isAuth) return true;

      // SI NO ESTA AUTENTICADO LO MANDO AL LOGIN
      return router.createUrlTree(['/auth/login']);
    })
  );
};


