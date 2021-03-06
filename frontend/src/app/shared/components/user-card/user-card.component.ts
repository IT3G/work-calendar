import { Component, HostBinding, Input, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ContextStoreService } from '../../../core/store/context-store.service';
import { Employee } from '../../models/employee.model';
import { SettingsModel } from '../../models/settings.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @HostBinding('attr.theme')
  @Input()
  public theme: string;

  @Input()
  user: Employee;

  @Input()
  isMobileVersion: boolean;

  @Input()
  date: moment.Moment;

  @Input()
  projectId: string;

  public baseUrl = environment.baseUrl;

  public percent: number;

  public settings$: Observable<SettingsModel>;

  constructor(private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.settings$ = this.contextStoreService.settings$.pipe(filter((s) => !!s));
  }

  public getPercent(): string {
    const month = +this.date.format('M');
    const year = +this.date.format('YYYY');

    const currentProject = this.user?.projectsNew?.find((p) => p.project_id === this.projectId);

    const infoForCurrentMonth = currentProject?.metadata.find((m) => m.month === month && m.year === year);

    if (!infoForCurrentMonth) {
      const currentProjectForLastPeriod = this.user.lastProjects.find((p) => p.project_id === this.projectId);
      return `${currentProjectForLastPeriod.percent}%`;
    }
    return `${infoForCurrentMonth ? infoForCurrentMonth.percent : 0}%`;
  }
}
