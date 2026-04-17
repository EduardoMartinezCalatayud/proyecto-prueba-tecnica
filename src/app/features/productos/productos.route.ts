import { Routes } from '@angular/router';

export const productosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/bandeja-productos/bandeja-productos.component')
        .then((m) => m.BandejaProductosComponent),
    title: 'Bandeja de Productos'
  },
  {
    path: 'producto/:id',
    loadComponent: () =>
      import('./components/bandeja-productos/bandeja-productos.component')
        .then((m) => m.BandejaProductosComponent),
    title: 'Detalle Producto'
  }
];
