/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GridBandejaProductosComponent } from './grid-bandeja-productos.component';
import { ConfirmationService } from 'primeng/api';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

describe('GridBandejaProductosComponent', () => {
  let component: GridBandejaProductosComponent;
  let fixture: ComponentFixture<GridBandejaProductosComponent>;
  const confirmationServiceMock = {
    confirm: jasmine.createSpy('confirm'),
    requireConfirmation$: new Subject<any>(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        GridBandejaProductosComponent,
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
    fixture = TestBed.createComponent(GridBandejaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe emitir el id del producto cuando se confirma la eliminación', () => {
    const productoMock = {
      id: 1,
      title: 'Laptop',
    };

    const emitSpy = spyOn(component.eliminar, 'emit');

    confirmationServiceMock.confirm.calls.reset();

    confirmationServiceMock.confirm.and.callFake((config: any) => {
      expect(config.message).toContain('Laptop');
      config.accept();
    });

    component.eliminarProducto(productoMock);

    expect(confirmationServiceMock.confirm).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(1);
  });
});
