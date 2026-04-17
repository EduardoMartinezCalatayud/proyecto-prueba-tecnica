/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  const confirmationServiceMock = {
    confirm: jasmine.createSpy('confirm'),
    requireConfirmation$: new Subject<any>(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MainLayoutComponent,
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
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
