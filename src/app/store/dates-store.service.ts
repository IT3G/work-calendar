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
    this.checkRepeatElement(task);
    if (task.dateEnd) {
      const lastDay = task.dateEnd;
      let dateStart = task.dateStart;

      while (dateStart.isBefore(lastDay)) {
        const obj = {
          dateStart: moment(dateStart),
          dateEnd: null,
          id: task.id
        };
        console.log(obj);
        dateStart = dateStart.add(1, 'd');
        this.checkRepeatElement(task);
        this.tasks.next(this.tasks.getValue().concat([obj]));
      }
    }
    this.tasks.next(this.tasks.getValue().concat([task]));
  }
  private checkRepeatElement(task: TasksModel) {
    const repeatElement = this.tasks.getValue().find(i => i.dateStart.isSame(task.dateStart));
    if (repeatElement) {
      const index = this.tasks.getValue().indexOf(repeatElement);
      this.tasks.getValue().splice(index, 1);
    }
  }

  public getTasks(): Observable<TasksModel[]> {
    return this.tasks;
  }
}
