import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { GetProductosResponse } from '../models/Response/getProductosResponse.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private URL_API = environment.API_BACKEND;
  constructor(private httpClient: HttpClient) {}

  getProductos() {
    const url = `${this.URL_API}/products`;
    return this.httpClient.get<GetProductosResponse[]>(url);
  }
}
