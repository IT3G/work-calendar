import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { TaskModel } from '../models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export abstract class TaskApiService {
  constructor() {}

  abstract addTask(task: TaskModel);

  abstract loadTasks(employee: Employee);

  abstract loadAllTasks();
}
