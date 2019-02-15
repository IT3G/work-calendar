import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { TaskModel } from '../models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService implements OnInit {
  private readonly _tasks = new BehaviorSubject<TaskModel[]>([]);

  readonly tasks$ = this._tasks.asObservable().pipe(shareReplay(1));

  public getTasks(): TaskModel[] {
    return this._tasks.getValue();
  }

  public addTasks(val: TaskModel[]) {
    this._tasks.next(val);
  }

  constructor() {}

  ngOnInit() {}
}
