import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { forkJoin, Subscription } from 'rxjs';
import { DictionaryApiService } from '../../core/services/dictionary-api.service';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { ToggleButtonDataModel } from '../../shared/components/radio-button-group/radio-button-group.model';
import { locationsDictionary } from '../../shared/const/locations-dictionary.const';
import {
  notFindColor,
  radioButtonGroupCommonColor,
  subdivisionColors
} from '../../shared/const/subdivision-colors.const';
import { DictionaryModel } from '../../shared/models/dictionary.model';
import { Employee } from '../../shared/models/employee.model';
import { ProjectDataModel } from '../models/project-data.model';

@Component({
  selector: 'app-projects-teams',
  templateUrl: './projects-teams.component.html',
  styleUrls: ['./projects-teams.component.scss']
})
export class ProjectsTeamsComponent implements OnInit, OnDestroy {
  public location = locationsDictionary;

  public filtersForm: FormGroup;

  public projectsData: ProjectDataModel[];
  public subdivisionData: ToggleButtonDataModel[];

  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private dictionaryApi: DictionaryApiService,
    private employeeApiService: EmployeeApiService
  ) {}

  ngOnInit() {
    this.filtersForm = this.fb.group({
      month: [moment()],
      subdivision: [radioButtonGroupCommonColor[0].value]
    });

    this.getData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getData() {
    const users$ = this.employeeApiService.loadAllEmployees();
    const projects$ = this.dictionaryApi.getAll('project');
    const subdivision$ = this.dictionaryApi.getAll('subdivision');

    forkJoin([users$, projects$, subdivision$]).subscribe(res => {
      const [usersAll, projects, subdivision] = res;

      // делаем выборку пользователей для каждого проекта,
      // и фильтруем проекты вообще без пользователей
      this.projectsData = this.getUsersForProjects(projects, usersAll);

      // привязываем цветовую схему через id подразделения
      this.subdivisionData = this.getColorForSubdivisions(subdivision);
    });
  }

  private getUsersForProjects(projects: DictionaryModel[], usersAll: Employee[]): ProjectDataModel[] {
    return projects
      .map(project => {
        const users = usersAll.filter(u => u.projectsNew && u.projectsNew.some(p => p.project_id === project._id));

        return {
          projectName: project.name,
          projectId: project._id,
          users
        };
      })
      .filter(item => item.users && item.users.length);
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

  public getLink(id: string): string {
    const date = moment().format('MM-YYYY');
    return `#/team-presence?date=${date}&name=&project=${id}`;
  }
}
