import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GetProductosResponse } from '../../models/Response/getProductosResponse.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Menu, MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ModalDetalleProductoComponent } from '../modal-detalle-producto/modal-detalle-producto.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-grid-bandeja-productos',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    MenuModule,
    ButtonModule,
    DialogModule,
    ModalDetalleProductoComponent,
    ProgressSpinnerModule,
    ConfirmDialogModule,
  ],
  templateUrl: './grid-bandeja-productos.component.html',
  styleUrls: ['./grid-bandeja-productos.component.css'],
})
export class GridBandejaProductosComponent implements OnInit {
  @ViewChild('menu') menu!: Menu;
  productoSeleccionado: any;
  visibleDialog: boolean = false;
  acciones: MenuItem[] = [];
  @Input() arrayProductos: GetProductosResponse[] = [];
  @Input() loading: boolean = false;
  @Output() eliminar = new EventEmitter<number>();

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {}

  abrirMenu(event: any, producto: any) {
    this.productoSeleccionado = producto;

    this.acciones = [
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => this.verProducto(this.productoSeleccionado),
      },
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.editarProducto(this.productoSeleccionado),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => this.eliminarProducto(this.productoSeleccionado),
      },
    ];

    this.menu.toggle(event);
  }

  onImgError(event: any) {
    event.target.src = 'https://placehold.co/150x150?text=No+Image';
  }

  verProducto(p: any) {
    this.productoSeleccionado = p.id;
    this.visibleDialog = true;
  }

  editarProducto(p: any) {
    this.router.navigate(['/productos', 'producto', p.id]);
  }

  eliminarProducto(p: any) {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar el producto "${p.title}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',

      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',

      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectButtonStyleClass: 'p-button-secondary p-button-sm',

      accept: () => {
        this.eliminar.emit(p.id);
      },
    });
  }
}
