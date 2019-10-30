import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskModel } from '../models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  private tasks$ = new BehaviorSubject<TaskModel[]>([]);

  public getTasksSnapshot(): TaskModel[] {
    return this.tasks$.value;
  }

  public getTasks(): Observable<TaskModel[]> {
    return this.tasks$;
  }

  public addTasks(val: TaskModel[]): void {
    this.tasks$.next(val);
  }
}
