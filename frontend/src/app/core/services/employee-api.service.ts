import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {
  constructor(private http: HttpClient) {}

  public loadAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.baseUrl}/users`);
  }

  public searchUserByLogin(usernameString: string): Observable<Employee> {
    return this.http.get<Employee>(`${environment.baseUrl}/users/login/${usernameString}`);
  }

  public searchUserById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${environment.baseUrl}/users/id/${id}`);
  }

  public updateUserInfo(login: string, data: Employee): Observable<Object> {
    return this.http.post<Object>(`${environment.baseUrl}/users/login/${login}`, data);
  }

  public addNewUser(data: { username: string }): Observable<Object> {
    return this.http.post<Object>(`${environment.baseUrl}/auth/add`, data);
  }
}
