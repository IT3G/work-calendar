import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequestModel } from '../../../../shared/models/auth.request.model';
import { Employee } from '../../../../shared/models/employee.model';
import { AuthApiService } from '../../auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiInBackendService implements AuthApiService {
  constructor(private http: HttpClient) {}

  public login(req: AuthRequestModel): Observable<Employee> {
    return this.http.post<Employee>('/backend/auth', req);
  }

  public registration(req: AuthRequestModel): Observable<any> {
    return this.http.post<any>('/backend/auth/registration', req);
  }
}
