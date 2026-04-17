import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthLoginResponse } from '../models/Response/authLoginResponse.model';
import { AuthLoginRequest } from '../models/Request/authLoginRequest.model';
import { StatusResponse } from '../../../shared/models/statusResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private URL_API = environment.API_BACKEND;
  constructor(
    private httpClient: HttpClient,
  ) {}

  login(request: AuthLoginRequest) {
    const url = `${this.URL_API}/auth/login`;
    return this.httpClient.post<AuthLoginResponse>(url, request);
  }

}
