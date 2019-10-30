import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DayType } from 'src/app/const/day-type.const';
import { Employee } from 'src/app/models/employee.model';
import { PresenceModel } from 'src/app/models/presence.page.model';
import { TaskModel } from 'src/app/models/tasks.models';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';

@Component({
  selector: 'app-team-presence',
  templateUrl: './team-presence-page.component.html',
  styleUrls: ['./team-presence-page.component.scss']
})
export class TeamPresencePageComponent implements OnInit, OnDestroy {
  qParamsSnpshotMonth = this.route.snapshot.queryParams.month;
  date$ = new BehaviorSubject<Moment>(this.qParamsSnpshotMonth ? moment(this.qParamsSnpshotMonth) : moment());
  employees$: Observable<Employee[]>;
  tasks$: Observable<TaskModel[]>;
  monthData$: Observable<PresenceModel[]>;
  monthDays$: Observable<Moment[]>;
  dateSub: Subscription;
  dayType = DayType;

  constructor(
    private employeeStoreService: EmployeeStoreService,
    private tasksStoreService: TasksStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.employees$ = this.employeeStoreService.getEmployees();
    this.tasks$ = this.tasksStoreService.getTasks();
    this.monthData$ = this.updateTaskData();
    this.monthDays$ = this.getMonthDays();

    this.dateSub = this.date$.subscribe(date => {
      this.router.navigate([], { queryParams: { month: date.toISOString() } });
    });
  }

  ngOnDestroy() {
    this.dateSub.unsubscribe();
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
            res.tasks.push(tasks.find(i => i.employee === e.mailNickname && moment(day).isSame(i.dateStart, 'day')));
            day.add(1, 'd');
          }

          return res;
        })
      )
    );
  }
}
