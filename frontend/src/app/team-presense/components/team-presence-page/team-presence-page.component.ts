import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, forkJoin, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { DayType } from '../../../shared/const/day-type.const';
import { locationsDictionary } from '../../../shared/const/locations-dictionary.const';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { Employee } from '../../../shared/models/employee.model';
import { PresenceModel } from '../../../shared/models/presence.page.model';
import { HolidaysApiService } from '../../../core/services/holidays-api.service';
import { HolidaysModel } from '../../../shared/models/holidays.model';
import { DateConvertService } from '../../../shared/services/date-convert.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TaskApiService } from '../../../core/services/task-api.service';
import { EmployeeApiService } from '../../../core/services/employee-api.service';
import { TaskModel } from '../../../shared/models/tasks.models';

@Component({
  selector: 'app-team-presence',
  templateUrl: './team-presence-page.component.html',
  styleUrls: ['./team-presence-page.component.scss']
})
export class TeamPresencePageComponent implements OnInit, OnDestroy {

  private qParamsSnapshotMonth = this.route.snapshot.queryParams.date;
  public date$ = new BehaviorSubject<moment.Moment>(
    this.qParamsSnapshotMonth ? moment(this.qParamsSnapshotMonth, 'MM-YYYY') : moment()
  );

  public monthData: PresenceModel[];
  public monthDays$: Observable<moment.Moment[]>;
  public dayType = DayType;

  public filtersForm: FormGroup;

  public tasks$: Observable<TaskModel[]>;

  private employees: Employee[];
  public holidays: HolidaysModel[];
  public projects: DictionaryModel[];
  public jobPositions: DictionaryModel[];
  public subdivisions: DictionaryModel[];
  public locations = locationsDictionary;


  private subscription = new Subscription();

  constructor(
    private employeeApi: EmployeeApiService,
    private tasksApi: TaskApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dictionaryApi: DictionaryApiService,
    private holidaysApi: HolidaysApiService,
    private dateConvertService: DateConvertService
  ) {
  }

  ngOnInit() {
    this.initFilterForm(this.route.snapshot.queryParams);
    this.monthDays$ = this.getMonthDays();

    this.getCommonData();
    this.updateTaskData();
    this.updateQueryParamsOnChange();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getCommonData() {
    const employees$ = this.employeeApi.loadAllEmployees();
    const holidays$ = this.holidaysApi.getAllHolidays();
    const projects$ = this.dictionaryApi.getAll('project');
    const jobPositions$ = this.dictionaryApi.getAll('jobPosition');
    const subdivisions$ = this.dictionaryApi.getAll('subdivision');

    forkJoin([employees$, holidays$, projects$, jobPositions$, subdivisions$]).subscribe(res => {
      const [employees, holidays, projects, jobPositions, subdivisions] = res;

      this.employees = employees;
      this.holidays = holidays;
      this.projects = projects;
      this.jobPositions = jobPositions;
      this.subdivisions = subdivisions;
    });
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

  private getMonthDays(): Observable<moment.Moment[]> {
    return this.date$.pipe(
      map(date => {
        const startOfMonth = date.clone().startOf('month');
        const endOfMonth = date.clone().endOf('month');

        const res: moment.Moment[] = [];

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
    this.date$.pipe(
      switchMap((date) => {
        return this.tasksApi.loadTasksByMonth(date.format('YYYY-MM-DD'));
      }))
      .pipe(
        filter((tasks) => !!(this.employees && this.employees.length && tasks))
      ).subscribe(tasks => {
      this.monthData = this.employees.map(emp => {
        return {
          employee: emp,
          tasks: tasks.filter(i => i.employee === emp.mailNickname)
        };
      });
    });
  }

  public convertDate(day: moment.Moment): NgbDateStruct {
    return this.dateConvertService.convertMomentToNgbDate(day);
  }

  public getStyleForGridPerMonth(): string {
    const days = this.date$.value.daysInMonth();
    return `30px 240px repeat(${days}, 1fr)`;
  }
}
