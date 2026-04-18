import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProductoService } from '../../services/producto.service';
import { GetProductosResponse } from '../../models/Response/getProductosResponse.model';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AgregarProductoRequest } from '../../models/Request/agregarProductoRequest.model';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-crear-editar-producto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
  templateUrl: './crear-editar-producto.component.html',
  styleUrls: ['./crear-editar-producto.component.css'],
})
export class CrearEditarProductoComponent implements OnInit {
  id: number = 0;
  form!: FormGroup;
  selectedFile!: File | null;
  productoResponse!: GetProductosResponse;
  loading = signal(false);
  esEditar: boolean = false;
  imagePreview = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    console.log('ID:', this.id);

    this.formNuevo();
    if (this.id && this.id !== 0) {
      this.esEditar = true;
      this.cargarProducto();
    } else {
      this.esEditar = false;
    }
  }

  formNuevo() {
    this.form = this.formBuilder.group({
      id: [0],
      title: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  formEditar() {
    this.form = this.formBuilder.group({
      id: [{ value: this.productoResponse.id, disabled: true }],
      title: [
        { value: this.productoResponse.title, disabled: false },
        Validators.required,
      ],
      price: [
        { value: this.productoResponse.price, disabled: false },
        Validators.required,
      ],
      description: [
        { value: this.productoResponse.description, disabled: false },
        Validators.required,
      ],
      category: [
        { value: this.productoResponse.category, disabled: false },
        Validators.required,
      ],
      image: [
        { value: this.productoResponse.image, disabled: false },
        Validators.required,
      ],
    });
  }

  cargarProducto() {
    this.loading.set(true);
    this.productoService
      .getProductoId(this.id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (response) {
            this.productoResponse = response;
            this.formEditar();
            this.imagePreview.set(this.productoResponse.image);
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

  actualizarPreview() {
    const url = this.form.get('image')?.value;
    this.imagePreview.set(url);
  }

  guardar() {
    if (this.form.invalid || this.form.value.price <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'ERROR',
        detail: 'Complete los campos correctamente.',
      });
      return;
    }
    if (this.form.value.price <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'ERROR',
        detail: 'El precio no puede ser igual o menor que 0.',
      });
      return;
    }
    let _formValue = this.form.getRawValue();
    let request: AgregarProductoRequest = {
      id: +_formValue.id,
      title: _formValue.title,
      price: +_formValue.price,
      description: _formValue.description,
      category: _formValue.category,
      image: _formValue.image,
    };
    this.esEditar ? this.editar(request) : this.registrar(request);
  }

  editar(request: AgregarProductoRequest) {
    this.loading.set(true);

    this.productoService
      .putEditarProducto(this.id, request)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'El producto fue editado.',
          });
          this.router.navigate(['/productos'], {
            state: { producto: response, action: 'editar' },
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'ERROR',
            detail: 'No se pudo actualizar el producto',
          });
        },
      });
  }

  registrar(request: AgregarProductoRequest) {
    this.loading.set(true);

    this.productoService
      .postAgregarProducto(request)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'El producto fue registrado.',
          });
          this.router.navigate(['/productos'], {
            state: { producto: response, action: 'crear' },
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'ERROR',
            detail: 'No se pudo registrar el producto',
          });
        },
      });
  }

  cancelar() {
    this.router.navigate(['/productos']);
  }

  onImgError(event: any) {
    event.target.src = 'https://placehold.co/150x150?text=No+Image';
    this.imagePreview.set(null);
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
    this.form.patchValue({
      image: file.name,
    });
  }
}
