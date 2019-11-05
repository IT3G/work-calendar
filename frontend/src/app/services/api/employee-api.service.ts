import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export abstract class EmployeeApiService {
  constructor() {}

  abstract loadAllEmployees(): Observable<Employee[]>;

  abstract searchUserByLogin(usernameString: string): Observable<Employee[]>;

  abstract searchUserById(id: string): Observable<Employee>;

  abstract updateUserInfo(login: string, data: Employee): Observable<Object>;
}
