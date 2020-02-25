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
  private readonly baseUrl = `${environment.baseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  public addTask(task: TaskModel): Observable<any> {
    return this.http.post<Employee>(this.baseUrl, task);
  }

  public loadAllTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.baseUrl);
  }

  public loadAllTasksByAuthor(author: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${this.baseUrl}/tasks-author/${author}`);
  }

  public loadAllTasksByEmployee(employee: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${this.baseUrl}/tasks-employee/${employee}`);
  }

  public loadTasksByMonth(date: string): Observable<PresenceModel[]> {
    return this.http.get<PresenceModel[]>(`${this.baseUrl}/tasks-month/${date}`);
  }

  public update(id: string, task: Partial<TaskModel>): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${this.baseUrl}/${id}`, task);
  }

  public deleteById(taskId: string): Observable<PresenceModel[]> {
    return this.http.delete<PresenceModel[]>(`${this.baseUrl}/${taskId}`);
  }

  public addResolution(taskId: string, file: any): Observable<TaskModel> {
    const formData = new FormData();

    /** Добавляем файл для случаев с файловым хранилищем */
    if (file && file.file) {
      formData.append('file', file.file, file.name);
    }

    return this.http.post<TaskModel>(`${this.baseUrl}/resolution/${taskId}`, formData);
  }
}
