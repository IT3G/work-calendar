import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, filter } from 'rxjs/operators';
import { TaskModel } from '../models/tasks.models';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService implements OnInit {
  private readonly _tasks = new BehaviorSubject<TaskModel[]>([]);

  private readonly tasks$ = this._tasks.asObservable().pipe(shareReplay(1));

  public getTasks(): TaskModel[] {
    return this._tasks.getValue();
  }

  public getTasks$(): Observable<TaskModel[]> {
    // return this.tasks$.pipe(filter(i => !!i));
    return this.tasks$;
  }

  public addTasks(val: TaskModel[]) {
    this._tasks.next(val);
  }

  constructor() {}

  ngOnInit() {}
}
