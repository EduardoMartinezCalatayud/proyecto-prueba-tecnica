import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren:() => import('./features/auth/auth.route').then((c) => c.authRoutes)
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
