import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Employee } from '../../shared/models/employee.model';
import { PresenceModel } from '../../shared/models/presence.page.model';
import { TaskModel } from '../../shared/models/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  constructor(private http: HttpClient) {}

  public addTask(task: TaskModel): Observable<any> {
    return this.http.post<Employee>(`${environment.baseUrl}/tasks`, task);
  }

  public loadAllTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${environment.baseUrl}/tasks`);
  }

  public loadAllTasksByAuthor(author: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${environment.baseUrl}/tasks/tasks-author/${author}`);
  }

  public loadAllTasksByEmployee(employee: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${environment.baseUrl}/tasks/tasks-employee/${employee}`);
  }

  public loadTasksByMonth(date: string): Observable<PresenceModel[]> {
    return this.http.get<PresenceModel[]>(`${environment.baseUrl}/tasks/tasks-month/${date}`);
  }

  public update(id: string, task: Partial<TaskModel>): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${environment.baseUrl}/tasks/${id}`, task);
  }

  public deleteById(taskId: string): Observable<PresenceModel[]> {
    return this.http.delete<PresenceModel[]>(`${environment.baseUrl}/tasks/${taskId}`);
  }
}
