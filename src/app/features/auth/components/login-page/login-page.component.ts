import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AuthLoginRequest } from '../../models/Request/authLoginRequest.model';
import { AuthLoginResponse } from '../../models/Response/authLoginResponse.model';
import { SeguridadService } from '../../../../shared/services/seguridad.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    CommonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  loading = signal(false);
  loginResponse!: AuthLoginResponse;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private seguridadService: SeguridadService,
  ) {}

  ngOnInit() {
    this.formLogin();
  }

  formLogin() {
    this.form = this.formBuilder.group({
      username: [{ value: '', disabled: false }, Validators.required],
      password: [{ value: '', disabled: false }, Validators.required],
    });
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    let _form = this.form.getRawValue();
    let request: AuthLoginRequest = {
      username: _form.username,
      password: _form.password,
    };

    this.authService
      .login(request)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          console.log(response);
          if (!response?.token) {
            this.messageService.add({
              severity: 'warn',
              summary: 'ERROR',
              detail: 'Error de credenciales',
            });
            return;
          }
          this.loginResponse = response;

          this.seguridadService.setToken(this.loginResponse.token);
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Inicio de sesión exitoso',
          });
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: 'Usuario y/o contaseña incorrectos',
          });
        },
      });
  }
}
