import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { forkJoin, Subscription } from 'rxjs';
import { DictionaryApiService } from '../../core/services/dictionary-api.service';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { locationsDictionary } from '../../shared/const/locations-dictionary.const';
import { Employee } from '../../shared/models/employee.model';
import {
  NotFindColor,
  RadioButtonGroupCommonColor,
  SubdivisionColors
} from '../../shared/const/subdivision-colors.const';
import { ToggleButtonData } from '../../shared/components/radio-button-group/radio-button-group.component';
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
      subdivision: [RadioButtonGroupCommonColor[0].value]
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
      const usersAll = res[0];
      const projects = res[1];
      const subdivision = res[2];

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

      this.subdivisionData = subdivision.map(item => {
        const subdivisionConstInfo = SubdivisionColors.find(el => el.subdivision_id === item._id);

        return {
          title: item.name,
          color: subdivisionConstInfo ? subdivisionConstInfo.color : NotFindColor,
          value: item.name
        };
      });
    });
  }

  public getLink(id: string): string {
    const date = moment().format('MM-YYYY');
    return `#/team-presence?date=${date}&name=&project=${id}`;
  }
}
