import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { TasksModel } from 'src/app/models/tasks.models';

@Injectable({ providedIn: 'root' })
export class DatesStoreService {
  private currentDate = new BehaviorSubject<Moment>(moment());
  private dateEnd = new BehaviorSubject<Moment>(null);
  private tasks = new BehaviorSubject<TasksModel[]>([]);
  constructor() {}

  public setDateStart(date: Moment) {
    this.currentDate.next(date);
  }
  public getDateStart(): Observable<Moment> {
    return this.currentDate;
  }
  public setDateEnd(date: Moment) {
    this.dateEnd.next(date);
  }
  public getDateEnd(): Observable<Moment> {
    return this.dateEnd;
  }
  public addTask(task: TasksModel) {
    this.tasks.next(this.tasks.getValue().concat([task]));
  }
  public getTasks(): Observable<TasksModel[]> {
    return this.tasks;
  }
}
