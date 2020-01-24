import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { locationsDictionary } from '../../shared/const/locations-dictionary.const';
import * as moment from 'moment';
import { DictionaryApiService } from '../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../shared/models/dictionary.model';


@Component({
  selector: 'app-projects-teams',
  templateUrl: './projects-teams.component.html',
  styleUrls: ['./projects-teams.component.scss']
})
export class ProjectsTeamsComponent implements OnInit, OnDestroy {
  public users: Employee[];
  public projects: DictionaryModel[];
  public location = locationsDictionary;

  private subscription = new Subscription();

  constructor(
    private dictionaryApi: DictionaryApiService,
    private employeeApiService: EmployeeApiService) {
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getData() {
    const users$ = this.employeeApiService.loadAllEmployees();
    const projects$ = this.dictionaryApi.getAll('project');

    forkJoin([users$, projects$])
      .subscribe(res => {
        this.users = res[0];
        this.projects = res[1];
      });
  }

  private getActiveUserProjects(user: Employee): string[] {
    return user.projects
      .filter(p => this.isProjectActive(p))
      .filter(p => p.project)
      .map(p => p.project.toString());
  }

  private isProjectActive(p): boolean {
    p.dateStart = p.dateStart ? p.dateStart : moment('1900-01-01').format();
    p.dateEnd = p.dateEnd ? p.dateEnd : moment('2100-01-01').format();
    return moment().isBetween(p.dateStart, p.dateEnd);
  }
}
