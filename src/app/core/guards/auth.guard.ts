import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SeguridadService } from '../../shared/services/seguridad.service';
import { UtilService } from '../../shared/services/util.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const seguridadService = inject(SeguridadService);
  const utilService = inject(UtilService)

  const token = seguridadService.getToken();

  if (!token) {
    return router.createUrlTree(['/auth/login']);
  }

  try {
    if (!token || token.trim() === '') {
      utilService.clearLocalStorage();
      return router.createUrlTree(['/auth/login']);
    }
  } catch {
    utilService.clearLocalStorage();
    return router.createUrlTree(['/auth/login']);
  }

  return true;
};
