import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { forkJoin, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { EmployeeApiService } from '../../../core/services/employee-api.service';
import { ProjectDataModel } from '../../../projects-teams/models/project-data.model';
import { ToggleButtonDataModel } from '../../../shared/components/radio-button-group/radio-button-group.model';
import {
  notFindColor,
  radioButtonGroupCommonColor,
  subdivisionColors,
} from '../../../shared/const/subdivision-colors.const';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { Employee } from '../../../shared/models/employee.model';
import { LocationUserModel } from '../../models/location-user.model';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss'],
})
export class PeoplePageComponent implements OnInit, OnDestroy {
  public isMobileVersion: boolean;

  public users: Employee[];

  /** уникальные города пользователей */
  public location: Set<string> = new Set();

  public filtersForm: FormGroup;

  public locationUser: LocationUserModel[];
  public projectsData: ProjectDataModel[];
  public subdivisionData: ToggleButtonDataModel[];
  public loadInProgress: boolean;

  private unsubscriber$ = new Subject();

  /** всего человек */
  public totalUsers: number;

  /** все подразделения */
  public allSubdivisions: string[];

  constructor(
    private fb: FormBuilder,
    private dictionaryApi: DictionaryApiService,
    private employeeApiService: EmployeeApiService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initFilterForm(this.route.snapshot.queryParams);

    this.getData();

    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((result) => (this.isMobileVersion = result.matches));

    this.subscribeToFormControlChange();

    this.subscribeToRouteChange();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
  /** инициализировать форму */
  private initFilterForm(filters?: Params): void {
    this.filtersForm = this.fb.group({
      month: [moment()],
      subdivision: [radioButtonGroupCommonColor[0].value],
    });

    if (filters) {
      this.filtersForm.patchValue(filters);
    }
  }

  /** подписка за изменение контролов */
  private subscribeToFormControlChange(): void {
    this.filtersForm.valueChanges.pipe(takeUntil(this.unsubscriber$)).subscribe((filters) => {
      const { month, ...otherFilters } = filters;
      this.router.navigate([], {
        queryParams: { ...this.route.snapshot.queryParams, ...otherFilters },
      });
    });
  }

  /** подписаться на изменение роута */
  private subscribeToRouteChange(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubscriber$)).subscribe((res) => {
      this.filtersForm.patchValue(res, { emitEvent: false });
      this.setTotalUsers();
    });
  }

  private setTotalUsers(): void {
    this.totalUsers = this.users
      ?.filter((user) => !!user.location)
      .filter((user) => {
        if (this.filtersForm.value['subdivision'] === 'all-items') {
          return true;
        }
        return user?.subdivision?.name === this.filtersForm.value['subdivision'];
      }).length;
  }

  private getData() {
    this.loadInProgress = true;
    const users$ = this.employeeApiService.loadAllEmployees().pipe(
      // Если уже уволился
      map((users) =>
        users.filter((user) => (user.terminationDate ? new Date(user.terminationDate) > new Date() : true))
      ),
      tap((users) => {
        this.users = users;
        const preCalculatedPeoplesLocation: Map<string, number> = new Map();
        users
          .filter((user) => !!user.location)
          .forEach((user) => {
            preCalculatedPeoplesLocation.set(
              user.location,
              preCalculatedPeoplesLocation.has(user.location) ? preCalculatedPeoplesLocation.get(user.location) + 1 : 1
            );
          });
        this.location = new Set(
          new Map([...preCalculatedPeoplesLocation.entries()].sort((a, b) => b[1] - a[1])).keys()
        );

        this.setTotalUsers();
      })
    );
    const subdivision$ = this.dictionaryApi.getAll('subdivision');

    forkJoin([users$, subdivision$]).subscribe((res) => {
      const [usersAll, subdivision] = res;
      this.loadInProgress = false;

      this.locationUser = this.getUsersByLocation(usersAll);

      this.allSubdivisions = subdivision
        .map((sub) => {
          return sub.name;
        })
        .concat('Не указано');

      this.subdivisionData = this.getColorForSubdivisions(subdivision);
      this.location.forEach((location) => this.locationUser[location]);
    });
  }

  private getUsersByLocation(usersAll: Employee[]): any {
    if (!usersAll) {
      return [];
    }

    const locationOfUsers = usersAll.reduce((result, array) => {
      const {
        _id,
        username,
        patronymic,
        location,
        position,
        whenCreated,
        email,
        telNumber,
        skype,
        telegram,
        physicalDeliveryOfficeName,
        mailNickname,
        isAdmin,
        hasMailing,
        subdivision,
        jobPosition,
        projectOffice,
        projectsNew,
        terminationDate,
        lastProjects,
        skills,
      } = array;

      result[location] = [
        ...(result[location] || []),
        {
          _id,
          username,
          patronymic,
          location,
          position,
          whenCreated,
          email,
          telNumber,
          skype,
          telegram,
          physicalDeliveryOfficeName,
          mailNickname,
          isAdmin,
          hasMailing,
          subdivision,
          jobPosition,
          projectOffice,
          projectsNew,
          terminationDate,
          lastProjects,
          skills,
        },
      ];

      return result;
    }, {});

    return locationOfUsers;
  }

  private getColorForSubdivisions(subdivision: DictionaryModel[]): ToggleButtonDataModel[] {
    return subdivision.map((item) => {
      const subdivisionConstInfo = subdivisionColors.find((el) => el.subdivision_id === item._id);

      return {
        title: item.name,
        color: subdivisionConstInfo ? subdivisionConstInfo.color : notFindColor,
        value: item.name,
      };
    });
  }
}
