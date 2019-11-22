import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthRequestModel } from '../../../../shared/models/auth.request.model';
import { Employee } from '../../../../shared/models/employee.model';
import { AuthApiService } from '../../auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiInBackendService implements AuthApiService {
  constructor(private http: HttpClient) {}

  public login(req: AuthRequestModel): Observable<Employee> {
    return this.http.post<Employee>(`${environment.baseUrl}/auth`, req);
  }

  public registration(req: AuthRequestModel): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/auth/registration`, req);
  }
}
