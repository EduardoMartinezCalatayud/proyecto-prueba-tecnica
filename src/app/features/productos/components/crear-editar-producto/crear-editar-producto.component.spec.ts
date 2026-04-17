/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrearEditarProductoComponent } from './crear-editar-producto.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

describe('CrearEditarProductoComponent', () => {
  let component: CrearEditarProductoComponent;
  let fixture: ComponentFixture<CrearEditarProductoComponent>;
  const confirmationServiceMock = {
    confirm: jasmine.createSpy('confirm'),
    requireConfirmation$: new Subject<any>(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CrearEditarProductoComponent,
        HeaderComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ConfirmationService,
          useValue: confirmationServiceMock,
        },
        {
          provide: MessageService,
          useValue: jasmine.createSpyObj('MessageService', ['add']),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear', () => {
    expect(component).toBeTruthy();
  });

  it('no debe enviar el formulario si es inválido', () => {
    component.form.patchValue({
      title: '',
      price: 0,
    });

    spyOn(component as any, 'registrar');

    component.guardar();

    expect(component['messageService'].add).toHaveBeenCalled();
  });
  it('debe llamar a editar cuando el formulario es válido y esEditar es true', () => {
    const spy = spyOn(component as any, 'editar');

    component.esEditar = true;

    component.form.patchValue({
      id: 1,
      title: 'Test',
      price: 100,
      description: 'desc',
      category: 'cat',
      image: 'img',
    });

    component.guardar();

    expect(spy).toHaveBeenCalled();
  });
  it('debe llamar a registrar cuando el formulario es válido y esEditar es false', () => {
    const spy = spyOn(component as any, 'registrar');

    component.esEditar = false;

    component.form.patchValue({
      id: 0,
      title: 'Nuevo producto',
      price: 50,
      description: 'desc',
      category: 'cat',
      image: 'img',
    });

    component.guardar();

    expect(spy).toHaveBeenCalled();
  });
});
