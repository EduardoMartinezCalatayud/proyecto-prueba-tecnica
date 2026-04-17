/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalDetalleProductoComponent } from './modal-detalle-producto.component';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModalDetalleProductoComponent', () => {
  let component: ModalDetalleProductoComponent;
  let fixture: ComponentFixture<ModalDetalleProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalDetalleProductoComponent, HeaderComponent,HttpClientTestingModule],
      providers: [MessageService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
