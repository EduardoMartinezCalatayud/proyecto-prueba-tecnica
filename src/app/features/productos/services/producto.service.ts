import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { GetProductosResponse } from '../models/Response/getProductosResponse.model';
import { catchError, throwError } from 'rxjs';
import { AgregarProductoRequest } from '../models/Request/agregarProductoRequest.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private URL_API = environment.API_BACKEND;
  private URL_PRODUCTO = `${this.URL_API}/products`;
  constructor(private httpClient: HttpClient) {}

  getProductos() {
    const url = this.URL_PRODUCTO;
    return this.httpClient.get<GetProductosResponse[]>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener productos', error);
        return throwError(() => error);
      }),
    );
  }

  getProductoId(id: number) {
    const url = `${this.URL_PRODUCTO}/${id}`;
    return this.httpClient.get<GetProductosResponse>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener producto', error);
        return throwError(() => error);
      }),
    );
  }

  postAgregarProducto(request: AgregarProductoRequest) {
    const url = this.URL_PRODUCTO;
    return this.httpClient.post<GetProductosResponse>(url,request).pipe(
      catchError((error) => {
        console.error('Error al crear el producto', error);
        return throwError(() => error);
      }),
    );
  }

  putEditarProducto(id:number, request:AgregarProductoRequest){
    const url = `${this.URL_PRODUCTO}/${id}`;
    return this.httpClient.put<GetProductosResponse>(url,request).pipe(
      catchError((error) => {
        console.error('Error al editar el producto', error);
        return throwError(() => error);
      }),
    );
  }

  deleteProducto(id:number){
    const url = `${this.URL_PRODUCTO}/${id}`;
    return this.httpClient.delete<GetProductosResponse>(url).pipe(
      catchError((error) => {
        console.error('Error al eliminar el producto', error);
        return throwError(() => error);
      }),
    );
  }
}
