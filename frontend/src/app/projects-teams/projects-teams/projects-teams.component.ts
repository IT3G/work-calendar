import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { locationsDictionary } from '../../shared/const/locations-dictionary.const';
import * as moment from 'moment-timezone';
import { DictionaryApiService } from '../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../shared/models/dictionary.model';
import { ActivatedRoute, Router } from '@angular/router';


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


  private qParamsSnpshotMonth = this.route.snapshot.queryParams.date;
  public date$ = new BehaviorSubject<moment.Moment>(
    this.qParamsSnpshotMonth ? moment(this.qParamsSnpshotMonth, 'MM-YYYY') : moment()
  );
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dictionaryApi: DictionaryApiService,
    private employeeApiService: EmployeeApiService) {
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public prevMonth(): void {
    this.date$.next(this.date$.value.clone().subtract(1, 'months'));
  }

  public nextMonth(): void {
    this.date$.next(this.date$.value.clone().add(1, 'months'));
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

  public getLink(id: string): string {
    const date = moment().format('MM-YYYY');
    return `#/team-presence?date=${date}&name=&project=${id}`;
  }
}
