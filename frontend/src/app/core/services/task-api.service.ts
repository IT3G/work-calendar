import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Employee } from '../../shared/models/employee.model';
import { SendingTaskModel } from '../../shared/models/sending-task.model';
import { TaskModel } from '../../shared/models/tasks.models';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  constructor(private http: HttpClient) {
  }

  public addTask(task: SendingTaskModel): Observable<any> {
    return this.http.post<Employee>(`${environment.baseUrl}/tasks`, task);
  }

  public loadAllTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${environment.baseUrl}/tasks`);
  }

  public loadAllTasksByAuthor(author: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${environment.baseUrl}/tasks/tasks-author/${author}`);
  }

  public loadTasksByMonth(date: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${environment.baseUrl}/tasks/tasks-month/${date}`);
  }
}
