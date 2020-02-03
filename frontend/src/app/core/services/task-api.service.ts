import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Employee } from '../../shared/models/employee.model';
import { SendingTaskModel } from '../../shared/models/sending-task.model';
import { PresenceModel } from '../../shared/models/presence.page.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  constructor(private http: HttpClient) {
  }

  public addTask(task: SendingTaskModel): Observable<any> {
    return this.http.post<Employee>(`${environment.baseUrl}/tasks`, task);
  }

  public loadAllTasks(): Observable<SendingTaskModel[]> {
    return this.http.get<SendingTaskModel[]>(`${environment.baseUrl}/tasks`);
  }

  public loadAllTasksByAuthor(author: string): Observable<SendingTaskModel[]> {
    return this.http.get<SendingTaskModel[]>(`${environment.baseUrl}/tasks/tasks-author/${author}`);
  }

  public loadAllTasksByEmployee(employee: string): Observable<SendingTaskModel[]> {
    return this.http.get<SendingTaskModel[]>(`${environment.baseUrl}/tasks/tasks-employee/${employee}`);
  }

  public loadTasksByMonth(date: string): Observable<PresenceModel[]> {
    return this.http.get<PresenceModel[]>(`${environment.baseUrl}/tasks/tasks-month/${date}`);
  }
}
