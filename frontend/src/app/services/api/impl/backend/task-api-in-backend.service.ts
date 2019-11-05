import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { SendingTaskModel } from 'src/app/models/sending-task.model';
import { TaskModel } from 'src/app/models/tasks.models';
import { TaskApiService } from '../../task-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskApiInBackendService implements TaskApiService {
  constructor(private http: HttpClient) {}

  public addTask(task: SendingTaskModel): Observable<Employee> {
    return this.http.post<Employee>('/backend/tasks', task);
  }

  public loadAllTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>('/backend/tasks');
  }
}
