import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { ProjectNewModel } from '../../../../shared/models/project-new.model';

@Component({
  selector: 'app-profile-projects-table',
  templateUrl: './profile-projects-table.component.html',
  styleUrls: ['./profile-projects-table.component.scss']
})
export class ProfileProjectsTableComponent {
  @Input()
  projects: ProjectNewModel[] = [];

  @Input()
  projectsMaxPeriod: moment.Moment[];
}
