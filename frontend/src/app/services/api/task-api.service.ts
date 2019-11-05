import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { SendingTaskModel } from 'src/app/models/sending-task.model';
import { TaskModel } from 'src/app/models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export abstract class TaskApiService {
  constructor() {}

  abstract addTask(task: SendingTaskModel): Observable<Employee>;

  abstract loadAllTasks(): Observable<TaskModel[]>;
}
