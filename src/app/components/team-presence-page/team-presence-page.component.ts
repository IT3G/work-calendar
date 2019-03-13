import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DayType } from 'src/app/const/day-type.const';
import { Employee } from 'src/app/models/employee.model';
import { PresenceModel } from 'src/app/models/presence-page.model';
import { TaskModel } from 'src/app/models/tasks.models';
import { TaskApiService } from 'src/app/services/api/task-api.service';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
@Component({
  selector: 'app-team-presence',
  templateUrl: './team-presence-page.component.html',
  styleUrls: ['./team-presence-page.component.scss']
})
export class TeamPresencePageComponent implements OnInit {
  date$ = new BehaviorSubject<Moment>(moment());
  employees$: Observable<Employee[]>;
  tasks$: Observable<TaskModel[]>;
  monthData$: Observable<PresenceModel[]>;
  monthDays$: Observable<Moment[]>;
  dayType = DayType;

  constructor(
    private employeeStoreService: EmployeeStoreService,
    private tasksStoreService: TasksStoreService,
    private taskApiService: TaskApiService
  ) {}

  ngOnInit() {
    this.taskApiService.loadAllTasks();
    this.employees$ = this.employeeStoreService.employees$;
    this.tasks$ = this.tasksStoreService.getTasks$();
    this.monthData$ = this.updateTaskData();
    this.monthDays$ = this.getMonthDays();
  }

  public prevMonth(): void {
    this.date$.next(moment(this.date$.value).subtract(1, 'months'));
  }

  public nextMonth(): void {
    this.date$.next(moment(this.date$.value).add(1, 'months'));
  }

  private getMonthDays() {
    return this.date$.pipe(
      map(date => {
        const startOfMonth = date.clone().startOf('month');
        const endOfMonth = date.clone().endOf('month');

        const res = [];

        const day = startOfMonth;
        while (day.isBefore(endOfMonth)) {
          res.push(day.clone());
          day.add(1, 'd');
        }

        return res;
      })
    );
  }

  private updateTaskData() {
    return combineLatest(this.date$, this.employees$, this.tasks$).pipe(
      filter(([date, employees, tasks]) => !!(employees && employees.length && tasks)),
      map(([date, employees, tasks]) =>
        employees.map(e => {
          const startOfMonth = date.clone().startOf('month');
          const endOfMonth = date.clone().endOf('month');

          const res = {
            employee: e,
            tasks: []
          };

          const day = startOfMonth;
          while (day.isBefore(endOfMonth)) {
            res.tasks.push(tasks.find(i => i.employeeId === e.id && moment(day).isSame(i.date, 'day')));
            day.add(1, 'd');
          }

          return res;
        })
      )
    );
  }
}
