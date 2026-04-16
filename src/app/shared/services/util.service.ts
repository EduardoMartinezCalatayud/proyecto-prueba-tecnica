import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UtilService {
  constructor(private route: Router) {}
  setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    this.removeLocalStorage(environment.VAR_TOKEN);
  }

  link(url: string, param?: any) {
    if (param) {
      this.route.navigate([url, param]);
    } else {
      this.route.navigate([url]);
    }
  }
}
