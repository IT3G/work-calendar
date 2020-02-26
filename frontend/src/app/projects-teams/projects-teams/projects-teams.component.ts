import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { DictionaryApiService } from '../../core/services/dictionary-api.service';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { locationsDictionary } from '../../shared/const/locations-dictionary.const';
import { DictionaryModel } from '../../shared/models/dictionary.model';
import { Employee } from '../../shared/models/employee.model';
import { SubdivisionColors } from '../../shared/const/subdivision-colors.const';
import { ToggleButtonData } from '../../shared/components/radio-button-group/radio-button-group.component';
import { ProjectNew } from '../../shared/models/project-new';
import { NewProjectUtils } from '../../shared/utils/new-project.utils';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface ProjectData {
  projectName: string;
  projectID: string;
  users: Employee[];
}

@Component({
  selector: 'app-projects-teams',
  templateUrl: './projects-teams.component.html',
  styleUrls: ['./projects-teams.component.scss']
})
export class ProjectsTeamsComponent implements OnInit, OnDestroy {
  public users: Employee[];
  public projects: DictionaryModel[];

  public location = locationsDictionary;

  public filtersForm: FormGroup;

  public projectsData: ProjectData[];
  public subdivisionData: ToggleButtonData[];

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dictionaryApi: DictionaryApiService,
    private employeeApiService: EmployeeApiService
  ) {}

  ngOnInit() {
    this.filtersForm = this.fb.group({
      month: [moment()],
      subdivision: ['all-items']
    });

    this.getData();

    this.subdivisionData = SubdivisionColors.map(item => {
      return {
        title: item.title,
        color: item.color,
        value: item.title
      };
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getData() {
    const users$ = this.employeeApiService.loadAllEmployees();
    const projects$ = this.dictionaryApi.getAll('project');

    forkJoin([users$, projects$]).subscribe(res => {
      const usersAll = res[0];
      const projects = res[1];

      this.projects = res[1];

      this.projectsData = projects
        .map(project => {
          const users = usersAll.filter(u => u.projectsNew && u.projectsNew.some(p => p.project_id === project._id));

          return {
            projectName: project.name,
            projectID: project._id,
            users
          };
        })
        .filter(item => item.users && item.users.length);
    });
  }

  public getLink(id: string): string {
    const date = moment().format('MM-YYYY');
    return `#/team-presence?date=${date}&name=&project=${id}`;
  }
}
