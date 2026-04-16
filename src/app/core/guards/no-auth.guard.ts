import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SeguridadService } from '../../shared/services/seguridad.service';

export const noAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const seguridadService = inject(SeguridadService);
  const token = seguridadService.getToken();

  return !token ? true : router.createUrlTree(['/productos']);
};

