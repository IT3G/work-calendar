import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequestModel } from '../../shared/models/auth.request.model';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthApiService {
  constructor() {}

  public abstract login(req: AuthRequestModel): Observable<Employee>;
}
