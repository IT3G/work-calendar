import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import * as moment from 'moment';
import { forkJoin, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SelectInputDataModel } from 'src/app/shared/components/single-select/single-select.component';
import { LocationEnum, mainLocations } from 'src/app/shared/models/location.enum';

import { DictionaryApiService } from '../../core/services/dictionary-api.service';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { DictionaryModel } from '../../shared/models/dictionary.model';
import { Employee } from '../../shared/models/employee.model';
import { ProjectDataModel } from '../models/project-data.model';

@Component({
  selector: 'app-projects-teams',
  templateUrl: './projects-teams.component.html',
  styleUrls: ['./projects-teams.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsTeamsComponent implements OnInit, OnDestroy {
  public isMobileVersion: boolean;
  public locations: SelectInputDataModel[];
  public projects: SelectInputDataModel[];

  public filtersForm: FormGroup;

  public projectsData: ProjectDataModel[];
  public subdivisionData: string[];
  public loadInProgress: boolean;

  private subscription = new Subscription();

  /** количество колонок в гриде */
  public totalColumnsProjectGrid: SafeStyle;

  constructor(
    private fb: FormBuilder,
    private dictionaryApi: DictionaryApiService,
    private employeeApiService: EmployeeApiService,
    private breakpointObserver: BreakpointObserver,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.filtersForm = this.fb.group({
      month: [moment()],
      name: '',
      location: null,
      project: null,
    });

    this.getData();

    this.subscription = this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((result) => (this.isMobileVersion = result.matches));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getData() {
    this.loadInProgress = true;
    const location$ = this.employeeApiService.getEmployeesLocations();
    const users$ = this.employeeApiService
      .loadAllEmployees()
      .pipe(
        map((users) =>
          users.filter((user) => (user.terminationDate ? new Date(user.terminationDate) > new Date() : true))
        )
      );
    const projects$ = this.dictionaryApi.getAll('project');
    const subdivision$ = this.dictionaryApi
      .getAll('subdivision')
      .pipe(map((subdivisions) => subdivisions.map((subdivision) => subdivision.name)));

    forkJoin([users$, projects$, subdivision$, location$]).subscribe((res) => {
      const [usersAll, projects, subdivision, location] = res;
      this.loadInProgress = false;
      // делаем выборку пользователей для каждого проекта,
      // и фильтруем проекты вообще без пользователей
      this.projectsData = this.getUsersForProjects(projects, usersAll);
      this.projects = projects.map((item) => ({ value: item.name, name: item.name }));
      this.subdivisionData = subdivision
        .filter((value) => {
          return this.getNumberOfUsersBySubdivision(value, usersAll);
        })
        .concat(['Не указано / Другое']);

      this.locations = location.filter((city) => !!city).map((item) => ({ value: item, name: item }));

      this.totalColumnsProjectGrid = this.sanitizer.bypassSecurityTrustStyle(
        `--total-columns: ${this.subdivisionData.length}`
      );
    });
  }

  /** количество людей по подразделениям на текущий месяц в проекте */
  private getNumberOfUsersBySubdivision(subdivison: string, users: Employee[]): boolean {
    return !!users.reduce((acc, user) => {
      if (user.subdivision?.name === subdivison && user.projectsNew?.length && this.isAnyCurrentProject(user)) {
        return (acc = acc + 1);
      }
      return acc;
    }, 0);
  }

  /** есть ли текущий проект */
  private isAnyCurrentProject(user: Employee): boolean {
    const month = +this.filtersForm.get('month').value.format('M');
    const year = +this.filtersForm.get('month').value.format('YYYY');
    return !!user.projectsNew.find((project) => {
      return project.metadata.find((data) => {
        return data.month === month && data.year === year;
      });
    });
  }
  private getUsersForProjects(projects: DictionaryModel[], usersAll: Employee[]): ProjectDataModel[] {
    return projects
      .map((project) => {
        const users = usersAll.filter((u) => u.projectsNew && u.projectsNew.some((p) => p.project_id === project._id));

        return {
          projectName: project.name,
          projectId: project._id,
          users: users,
        };
      })
      .filter((item) => item.users && item.users.length);
  }

  public getLink(id: string): string {
    const date = moment().format('MM-YYYY');
    return `#/team-presence?date=${date}&name=&project=${id}`;
  }

  /** Для перерисовки контента */
  public trackByFn(index, item) {
    return index;
  }

  /** видимость названия проекта и самого проекта */
  public getProjectVisability(project: ProjectDataModel) {
    const filter = this.filtersForm.value;
    return filter.name || filter.project || filter.location
      ? project.projectName === filter.project || project.users.length
      : project.users.length;
  }
}
