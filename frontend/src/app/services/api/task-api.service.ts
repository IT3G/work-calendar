import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../../models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export abstract class TaskApiService {
  constructor() {}

  abstract addTask(task: TaskModel): Observable<Object>;

  abstract loadAllTasks(): Observable<Object>;

  abstract mapToTaskModel(task: TaskModel[]): TaskModel[];
}
