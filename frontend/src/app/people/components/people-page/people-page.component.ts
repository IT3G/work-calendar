import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { forkJoin, Subscription } from 'rxjs';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { EmployeeApiService } from '../../../core/services/employee-api.service';
import { ProjectDataModel } from '../../../projects-teams/models/project-data.model';
import { ToggleButtonDataModel } from '../../../shared/components/radio-button-group/radio-button-group.model';
import { locationsDictionary } from '../../../shared/const/locations-dictionary.const';
import {
  notFindColor,
  radioButtonGroupCommonColor,
  subdivisionColors
} from '../../../shared/const/subdivision-colors.const';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { Employee } from '../../../shared/models/employee.model';
import { LocationUserModel } from '../../models/location-user.model';
import { mainLocations, LocationEnum } from 'src/app/shared/models/location.enum';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements OnInit, OnDestroy {
  public isMobileVersion: boolean;
  public location = locationsDictionary;

  public filtersForm: FormGroup;

  public locationUser: LocationUserModel[];
  public projectsData: ProjectDataModel[];
  public subdivisionData: ToggleButtonDataModel[];
  public loadInProgress: boolean;

  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private dictionaryApi: DictionaryApiService,
    private employeeApiService: EmployeeApiService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.filtersForm = this.fb.group({
      month: [moment()],
      subdivision: [radioButtonGroupCommonColor[0].value]
    });

    this.getData();

    this.subscription = this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe(result => (this.isMobileVersion = result.matches));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getData() {
    this.loadInProgress = true;
    const users$ = this.employeeApiService.loadAllEmployees();
    const subdivision$ = this.dictionaryApi.getAll('subdivision');

    forkJoin([users$, subdivision$]).subscribe(res => {
      const [usersAll, subdivision] = res;
      this.loadInProgress = false;

      this.locationUser = this.getUsersByLocation(usersAll);

      this.subdivisionData = this.getColorForSubdivisions(subdivision);
    });
  }

  private getUsersByLocation(usersAll: Employee[]): any {
    if (!usersAll) {
      return [];
    }
    const filteredUsers = usersAll.filter(user => user.location);

    const usersWithOtherCities = filteredUsers.map(user =>
      mainLocations.includes(user.location as LocationEnum) ? user : { ...user, location: LocationEnum.others }
    );

    const locationOfUsers = usersWithOtherCities.reduce((result, array) => {
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
        projectsNew,
        terminationDate,
        lastProjects
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
          projectsNew,
          terminationDate,
          lastProjects
        }
      ];

      return result;
    }, {});

    return locationOfUsers;
  }

  private getColorForSubdivisions(subdivision: DictionaryModel[]): ToggleButtonDataModel[] {
    return subdivision.map(item => {
      const subdivisionConstInfo = subdivisionColors.find(el => el.subdivision_id === item._id);

      return {
        title: item.name,
        color: subdivisionConstInfo ? subdivisionConstInfo.color : notFindColor,
        value: item.name
      };
    });
  }
}
