import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TaskModel } from '../../shared/models/tasks.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  public originalTasks$ = new BehaviorSubject<TaskModel[]>([]);
  private tasks$ = new BehaviorSubject<TaskModel[]>([]);
  private updateEmitter$ = new Subject();

  public getTasksSnapshot(): TaskModel[] {
    return this.tasks$.value.map(task => <TaskModel>{ ...task });
  }

  public getTasks(): Observable<TaskModel[]> {
    return this.tasks$.asObservable().pipe(map(tasks => tasks.map(task => <TaskModel>{ ...task })));
  }

  public addTasks(val: TaskModel[]): void {
    this.tasks$.next(val.map(task => <TaskModel>{ ...task }));
  }

  public update(): void {
    this.updateEmitter$.next();
  }

  public updater(): Subject<unknown> {
    return this.updateEmitter$;
  }
}
