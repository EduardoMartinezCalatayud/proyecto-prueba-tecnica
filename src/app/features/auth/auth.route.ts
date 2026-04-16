import { Routes } from '@angular/router';
import { noAuthGuard } from '../../core/guards/no-auth.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login-page/login-page.component').then(
        (c) => c.LoginPageComponent,
      ),
      title: 'Login',
      canActivate:[noAuthGuard]
  },
];
