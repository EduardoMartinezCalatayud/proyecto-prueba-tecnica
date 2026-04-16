import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeguridadService {
  constructor(private utilService: UtilService) {}
  setToken(token: string) {
    this.utilService.setLocalStorage(environment.VAR_TOKEN, token);
  }

  getToken() {
    return this.utilService.getLocalStorage(environment.VAR_TOKEN);
  }

  logout(): void {
    this.utilService.clearLocalStorage();
    this.utilService.link('/auth/login');
  }
}
