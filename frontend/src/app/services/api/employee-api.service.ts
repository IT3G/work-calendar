import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export abstract class EmployeeApiService {
  constructor() {}

  abstract loadAllEmployees(): Observable<Object>;

  abstract searchUserByLogin(usernameString: string): Observable<Object>;

  abstract searchUserById(id: string): Observable<Object>;

  abstract updateUserInfo(formValue: Employee): void;
}
