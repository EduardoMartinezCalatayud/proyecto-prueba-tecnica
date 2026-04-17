/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BandejaProductosComponent } from './bandeja-productos.component';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfirmationService } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';

describe('BandejaProductosComponent', () => {
  let component: BandejaProductosComponent;
  let fixture: ComponentFixture<BandejaProductosComponent>;
  const confirmationServiceMock = {
    confirm: jasmine.createSpy('confirm'),
    requireConfirmation$: new Subject<any>(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BandejaProductosComponent,
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
    fixture = TestBed.createComponent(BandejaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear', () => {
    expect(component).toBeTruthy();
  });

  it('sdebe filtrar productos por nombre', () => {
    component.arrayProductosOriginal.set([
      {
        id: 1,
        title: 'Laptop',
        price: 100,
        category: '',
        description: '',
        image: '',
      },
      {
        id: 2,
        title: 'Mouse',
        price: 50,
        category: '',
        description: '',
        image: '',
      },
    ]);

    component.filtrar('lap');

    expect(component.arrayProductos().length).toBe(1);
  });

  it('debe eliminar un producto y actualizar las listas', () => {
    component.arrayProductosOriginal.set([
      {
        id: 1,
        title: 'Laptop',
        price: 100,
        category: '',
        description: '',
        image: '',
      },
    ]);

    spyOn(component['productoService'], 'deleteProducto').and.returnValue(
      of({
        id: 1,
        title: 'Laptop',
        price: 100,
        category: '',
        description: '',
        image: '',
      }),
    );

    component.eliminarProducto(1);

    expect(component.arrayProductosOriginal().length).toBe(0);
  });
  it('debe listar productos desde el servicio cuando la lista original está vacía', () => {
    const mockResponse = [
      {
        id: 1,
        title: 'Laptop',
        price: 100,
        category: '',
        description: '',
        image: '',
      },
    ];

    const spy = spyOn(
      component['productoService'],
      'getProductos',
    ).and.returnValue(of(mockResponse));

    component.buscar();

    expect(spy).toHaveBeenCalled();
    expect(component.arrayProductosOriginal().length).toBe(1);
    expect(component.arrayProductos().length).toBe(1);
  });
});
