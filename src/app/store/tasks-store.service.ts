import { Employee } from '../models/employee.model';
import { TaskModel } from '../models/tasks.models';
import { employeeList } from './test-data';
import { Injectable, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { shareReplay } from 'rxjs/operators';
import { DayType } from '../shared/const/day-type.const';
import _ from 'lodash';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService implements OnInit {
  private readonly _tasks = new BehaviorSubject<TaskModel[]>([]);

  readonly tasks$ = this._tasks.asObservable().pipe(shareReplay(1));

  get tasks(): TaskModel[] {
    return this._tasks.getValue();
  }

  set tasks(val: TaskModel[]) {
    this._tasks.next(val);
  }

  addTasks(type: DayType, date: Moment) {
    const dtStr = date.format('L');
    const found = this.tasks.find(
      o => o.date.format('L') === dtStr //
    );

    console.log('add' + date);

    let newTasks: TaskModel[] = this.tasks;

    if (found) {
      console.log('found');
      newTasks = this.tasks.filter(o => o !== found);
      //newTasks = _.remove(this.tasks, found);
    }

    console.log('total after remove ' + newTasks.length);

    const newTask = { id: this.tasks.length + 1, type: type, date: date, day: date.startOf('day') };
    this.tasks = [...newTasks, newTask];
    //this.tasks.push(newTask);
  }

  removeTasks(id: number) {
    this.tasks = this.tasks.filter(todo => todo.id !== id);
  }

  constructor() {
    // const date = new Date();
    // this.selectedDate = {
    //   day: date.getUTCDay(),
    //   month: date.getUTCMonth(),
    //   year: date.getUTCFullYear()
    // };
    // this.employees = employeeList;
    // this.tasks = [];
  }

  ngOnInit() {}

  // public getEmployees(): Observable<Employee[]> {
  //   return new Observable<Employee[]>(observer => {
  //     setTimeout(() => {
  //       observer.next(employeeList);
  //     }, 0);
  //   });
  // }

  // public getTask(date: Moment): TasksModel {
  //   const result = this.tasks.find(i => i.date.isSame(date));

  //   if (result === null) {
  //     return {
  //       date: date,
  //       id: 'LEFT'
  //     };
  //   }

  //   return result;
  // }
}
