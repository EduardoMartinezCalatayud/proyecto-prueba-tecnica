import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SeguridadService } from '../../services/seguridad.service';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, AvatarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleDrawer = new EventEmitter<void>();
  items: MenuItem[] = [];
  constructor(
    private seguridadService: SeguridadService,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.cargarMenu();
  }

  cargarMenu() {
    this.items = [
      {
        label: 'Productos',
        icon: 'pi pi-box',
        command: () => this.router.navigate(['/productos']),
      },
    ];
  }

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }

  logout() {
    this.confirmationService.confirm({
      message: `¿Deseas cerrar sesión"?`,
      header: 'Cerrar Sesión',
      icon: 'pi pi-exclamation-triangle',

      acceptLabel: 'Sí',
      rejectLabel: 'Cancelar',

      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectButtonStyleClass: 'p-button-secondary p-button-sm',

      accept: () => {
        this.seguridadService.logout();
      },
    });
  }
}
