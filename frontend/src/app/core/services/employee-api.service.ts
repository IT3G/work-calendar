import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {
  constructor(private http: HttpClient) {}

  public loadAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('backend/users');
  }

  public searchUserByLogin(usernameString: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`backend/users/login/${usernameString}`);
  }

  public searchUserById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`backend/users/id/${id}`);
  }

  public updateUserInfo(login: string, data: Employee): Observable<Object> {
    return this.http.post<Object>(`backend/users/login/${login}`, data);
  }
}
