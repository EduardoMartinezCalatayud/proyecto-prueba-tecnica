import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SeguridadService } from '../../shared/services/seguridad.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const seguridadService = inject(SeguridadService);

  const token = seguridadService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned);
  }

  return next(req);
};
