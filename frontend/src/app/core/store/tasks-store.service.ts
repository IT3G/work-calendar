import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TaskModel } from '../../shared/models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  private tasks$ = new BehaviorSubject<TaskModel[]>([]);
  private updateEmitter$ = new Subject();

  public getTasksSnapshot(): TaskModel[] {
    return this.tasks$.value;
  }

  public getTasks(): Observable<TaskModel[]> {
    return this.tasks$;
  }

  public addTasks(val: TaskModel[]): void {
    this.tasks$.next(val);
  }

  public update(): void {
    this.updateEmitter$.next();
  }

  public updater(): Subject<any> {
    return this.updateEmitter$;
  }
}
