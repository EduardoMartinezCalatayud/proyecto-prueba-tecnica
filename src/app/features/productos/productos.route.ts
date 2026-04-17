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
    path: 'crear',
    loadComponent: () =>
      import('./components/crear-editar-producto/crear-editar-producto.component')
        .then((m) => m.CrearEditarProductoComponent),
    title: 'Crear Producto'
  },
  {
    path: 'producto/:id',
    loadComponent: () =>
      import('./components/crear-editar-producto/crear-editar-producto.component')
        .then((m) => m.CrearEditarProductoComponent),
    title: 'Editar Producto'
  }
];
