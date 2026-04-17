import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GridBandejaProductosComponent } from '../grid-bandeja-productos/grid-bandeja-productos.component';
import { ProductoService } from '../../services/producto.service';
import { GetProductosResponse } from '../../models/Response/getProductosResponse.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { signal } from '@angular/core';

@Component({
  selector: 'app-bandeja-productos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    GridBandejaProductosComponent,
    ToastModule,
  ],
  templateUrl: './bandeja-productos.component.html',
  styleUrls: ['./bandeja-productos.component.css'],
})
export class BandejaProductosComponent implements OnInit {
  form!: FormGroup;
  arrayProductos = signal<GetProductosResponse[]>([]);
  arrayProductosOriginal = signal<GetProductosResponse[]>([]);
  loading = signal(false);
  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formNuevo();
    this.buscar();
  }

  formNuevo() {
    this.form = this.formBuilder.group({
      nombreProducto: [{ value: '', disabled: false }],
    });
  }

  buscar() {
    let producto = this.form.getRawValue().nombreProducto?.toLowerCase() || '';

    if (this.arrayProductosOriginal().length === 0) {
      this.loading.set(true);

      this.productoService
        .getProductos()
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: (response) => {
            this.arrayProductosOriginal.set(response);
            this.estadoNav();
            this.filtrar(producto);
          },
          error: () => {
            this.messageService.add({
              severity: 'warn',
              summary: 'ERROR',
              detail: 'Error al cargar los productos',
            });
          },
        });
    } else {
      this.estadoNav();
      this.filtrar(producto);
    }
  }

  estadoNav() {
    const state = history.state;
    if (!state || !state.action) return;
    if (state.action === 'crear') {
      const nuevo = state.producto;
      this.arrayProductosOriginal.update((list) => {
        const existe = list.some((p) => p.id === nuevo.id);
        return existe ? list : [...list, nuevo];
      });
      this.arrayProductos.update((list) => {
        const existe = list.some((p) => p.id === nuevo.id);
        return existe ? list : [...list, nuevo];
      });
    }
    if (state.action === 'editar') {
      this.arrayProductosOriginal.update((list) =>
        list.map((p) => (p.id === state.producto.id ? state.producto : p)),
      );
      this.arrayProductos.update((list) =>
        list.map((p) => (p.id === state.producto.id ? state.producto : p)),
      );
    }
  }

  filtrar(filtro: string) {
    if (filtro == '') {
      this.arrayProductos.set([...this.arrayProductosOriginal()]);
      return;
    }

    this.arrayProductos.set(
      this.arrayProductosOriginal().filter((p) =>
        p.title.toLowerCase().includes(filtro),
      ),
    );
  }

  eliminarProducto(id: number) {
    this.loading.set(true);

    this.productoService
      .deleteProducto(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Eliminado',
            detail: 'Producto eliminado correctamente',
          });

          this.arrayProductosOriginal.update((list) =>
            list.filter((p) => p.id !== id),
          );

          this.arrayProductos.update((list) => list.filter((p) => p.id !== id));
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: 'No se pudo eliminar',
          });
        },
      });
  }

  limpiar() {
    this.form.reset();
    this.arrayProductos.set([...this.arrayProductosOriginal()]);
  }

  crear() {
    this.router.navigate(['/productos', 'crear']);
  }
}
