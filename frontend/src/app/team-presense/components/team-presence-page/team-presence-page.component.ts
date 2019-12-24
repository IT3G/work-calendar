import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { EmployeeStoreService } from '../../../core/store/employee-store.service';
import { TasksStoreService } from '../../../core/store/tasks-store.service';
import { DayType } from '../../../shared/const/day-type.const';
import { locationsDictionary } from '../../../shared/const/locations-dictionary.const';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { Employee } from '../../../shared/models/employee.model';
import { PresenceModel } from '../../../shared/models/presence.page.model';
import { TaskModel } from '../../../shared/models/tasks.models';
import { HolidaysApiService } from '../../../core/services/holidays-api.service';
import { HolidaysModel } from '../../../shared/models/holidays.model';
import { DateConvertService } from '../../../shared/services/date-convert.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-team-presence',
  templateUrl: './team-presence-page.component.html',
  styleUrls: ['./team-presence-page.component.scss']
})
export class TeamPresencePageComponent implements OnInit, OnDestroy {
  public monthData$: Observable<PresenceModel[]>;
  public monthDays$: Observable<Moment[]>;
  public dayType = DayType;
  private qParamsSnpshotMonth = this.route.snapshot.queryParams.date;
  public date$ = new BehaviorSubject<Moment>(
    this.qParamsSnpshotMonth ? moment(this.qParamsSnpshotMonth, 'MM-YYYY') : moment()
  );

  public filtersForm: FormGroup;
  public projects$: Observable<DictionaryModel[]>;
  public jobPositions$: Observable<DictionaryModel[]>;
  public subdivisions$: Observable<DictionaryModel[]>;
  public locations = locationsDictionary;

  private employees$: Observable<Employee[]>;
  private tasks$: Observable<TaskModel[]>;

  public holidays$: BehaviorSubject<HolidaysModel[]> = new BehaviorSubject<HolidaysModel[]>([]);

  private subscription = new Subscription();

  constructor(
    private employeeStoreService: EmployeeStoreService,
    private tasksStoreService: TasksStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dictionaryApi: DictionaryApiService,
    private holidaysService: HolidaysApiService,
    private dateConvertService: DateConvertService
  ) {
  }

  ngOnInit() {
    this.initFilterForm(this.route.snapshot.queryParams);
    this.employees$ = this.employeeStoreService.getEmployees();
    this.tasks$ = this.tasksStoreService.getTasks();
    this.holidaysService.getAllHolidays().subscribe(res => this.holidays$.next(res));

    this.monthDays$ = this.getMonthDays();

    this.tasksStoreService.update();
    this.employeeStoreService.update();

    this.updateTaskData();
    this.updateQueryParamsOnChange();

    this.projects$ = this.dictionaryApi.getAll('project');
    this.jobPositions$ = this.dictionaryApi.getAll('jobPosition');
    this.subdivisions$ = this.dictionaryApi.getAll('subdivision');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public prevMonth(): void {
    this.date$.next(this.date$.value.clone().subtract(1, 'months'));
  }

  public nextMonth(): void {
    this.date$.next(this.date$.value.clone().add(1, 'months'));
  }

  private updateQueryParamsOnChange() {
    this.subscription.add(
      this.date$.subscribe(date =>
        this.router.navigate([], {
          queryParams: { ...this.route.snapshot.queryParams, date: moment(date).format('MM-YYYY') }
        })
      )
    );

    this.subscription.add(
      this.filtersForm.valueChanges.subscribe(filters =>
        this.router.navigate([], {
          queryParams: { ...this.route.snapshot.queryParams, ...filters }
        })
      )
    );
  }

  private getMonthDays(): Observable<Moment[]> {
    return this.date$.pipe(
      map(date => {
        const startOfMonth = date.clone().startOf('month');
        const endOfMonth = date.clone().endOf('month');

        const res: Moment[] = [];

        const day = startOfMonth;
        while (day.isBefore(endOfMonth)) {
          res.push(day.clone());
          day.add(1, 'd');
        }
        return res;
      })
    );
  }

  private initFilterForm(filters?: Params): void {
    this.filtersForm = this.fb.group({
      name: [''],
      subdivision: [null],
      jobPosition: [null],
      project: [null],
      location: [null]
    });

    if (filters) {
      this.filtersForm.patchValue(filters);
    }
  }

  private updateTaskData(): void {
    this.monthData$ = combineLatest([this.date$, this.employees$, this.tasks$]).pipe(
      filter(([_, employees, tasks]) => !!(employees && employees.length && tasks)),
      map(([date, employees, tasks]) =>
        employees.map(emp => {
          const startOfMonth = date.clone().startOf('month');
          const endOfMonth = date.clone().endOf('month');

          const res = {
            employee: emp,
            tasks: []
          };

          const day = startOfMonth;
          while (day.isBefore(endOfMonth)) {
            const task = tasks.filter(i => i.employee === emp.mailNickname && moment(day).isSame(i.dateStart, 'day'));
            if (task.length) {
              task.sort((a, b) => (a.dtCreated.isAfter(b.dtCreated) ? -1 : 1));
              const lastTask = task[0];
              res.tasks.push(lastTask);
            } else {
              res.tasks.push({
                dateStart: moment(day)
              });
            }

            day.add(1, 'd');
          }

          return res;
        })
      )
    );
  }

  public convertDate(day: Moment): NgbDateStruct {
    return this.dateConvertService.convertMomentToNgbDate(day);
  }

  public getStyleForGridPerMonth(): string {
    const days = this.date$.value.daysInMonth();
    return `30px 240px repeat(${days}, 1fr)`;
  }
}
