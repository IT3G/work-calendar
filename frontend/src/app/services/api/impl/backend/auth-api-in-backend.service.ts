import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequestModel } from 'src/app/models/auth.request.model';
import { AuthApiService } from '../../auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiInBackendService implements AuthApiService {
  constructor(private http: HttpClient) {}

  public login(req: AuthRequestModel) {
    const url = '/backend/auth';
    return this.http.post(url, req);
  }
}
