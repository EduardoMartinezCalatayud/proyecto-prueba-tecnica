import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProductoService } from '../../services/producto.service';
import { GetProductosResponse } from '../../models/Response/getProductosResponse.model';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { signal } from '@angular/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modal-detalle-producto',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './modal-detalle-producto.component.html',
  styleUrls: ['./modal-detalle-producto.component.css'],
})
export class ModalDetalleProductoComponent implements OnChanges {
  @Input() visibleDialog: boolean = false;
  @Output() visibleDialogChange = new EventEmitter<boolean>();
  @Input() productoSeleccionado: any;
  productoResponse!: GetProductosResponse;
  loading = signal(false);

  constructor(
    private productoService: ProductoService,
    private messageService: MessageService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['productoSeleccionado'] &&
      changes['productoSeleccionado'].currentValue !==
        changes['productoSeleccionado'].previousValue
    ) {
      this.cargarProducto();
    }
  }

  cerrar() {
    this.visibleDialogChange.emit(false);
  }

  cargarProducto() {
    if (!this.productoSeleccionado) {
      this.cerrar();
      return;
    }
    this.loading.set(true);
    this.productoResponse = null as any;
    this.productoService
      .getProductoId(this.productoSeleccionado)
      .pipe(finalize(() => (this.loading.set(false))))
      .subscribe({
        next: (response) => {
          if (response) {
            this.productoResponse = response;
            console.log('pr',this.productoResponse)
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'ERROR',
            detail: err.error,
          });
        },
      });
  }

  onImgError(event: any) {
    event.target.src = 'https://placehold.co/150x150?text=No+Image';
  }
}
