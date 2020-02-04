import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, forkJoin, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, share, switchMap, tap } from 'rxjs/operators';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { locationsDictionary } from '../../../shared/const/locations-dictionary.const';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { PresenceModel } from '../../../shared/models/presence.page.model';
import { HolidaysApiService } from '../../../core/services/holidays-api.service';
import { HolidaysModel } from '../../../shared/models/holidays.model';
import { DateConvertService } from '../../../shared/services/date-convert.service';
import { TaskApiService } from '../../../core/services/task-api.service';
import { EmployeeApiService } from '../../../core/services/employee-api.service';

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

  public monthData$: Observable<PresenceModel[]>;
  public monthDays$: Observable<moment.Moment[]>;

  public filtersForm: FormGroup;
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
  ) {
  }

  ngOnInit() {
    this.initFilterForm(this.route.snapshot.queryParams);
    this.monthDays$ = this.getMonthDays();

    this.getCommonData();

    this.monthData$ = this.date$.pipe(
      map((date) => date.format('YYYY-MM-DD')),
      distinctUntilChanged(),
      switchMap((date) => this.tasksApi.loadTasksByMonth(date)),
      share());

    this.updateQueryParamsOnChange();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getCommonData() {
    const holidays$ = this.holidaysApi.getAllHolidays();
    const projects$ = this.dictionaryApi.getAll('project');
    const jobPositions$ = this.dictionaryApi.getAll('jobPosition');
    const subdivisions$ = this.dictionaryApi.getAll('subdivision');

    this.subscription.add(
      forkJoin([holidays$, projects$, jobPositions$, subdivisions$]).subscribe(res => {
        const [holidays, projects, jobPositions, subdivisions] = res;

        this.holidays = holidays;
        this.projects = projects;
        this.jobPositions = jobPositions;
        this.subdivisions = subdivisions;
      }));
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
}
