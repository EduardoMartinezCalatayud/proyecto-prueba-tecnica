import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.route').then((c) => c.authRoutes),
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'productos',
        loadChildren: () =>
          import('./features/productos/productos.route').then(
            (m) => m.productosRoutes,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
