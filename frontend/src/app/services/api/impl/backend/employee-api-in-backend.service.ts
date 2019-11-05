import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeApiService } from '../../employee-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiInBackendService implements EmployeeApiService {
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
