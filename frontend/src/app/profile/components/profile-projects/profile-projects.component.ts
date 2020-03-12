import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { ProjectNewModel } from '../../../shared/models/project-new.model';
import { NewProjectUtils } from '../../../shared/utils/new-project.utils';

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileProjectsComponent {
  @Input()
  projects: ProjectNewModel[] = [];

  @Output()
  updateValue = new EventEmitter<{ project: ProjectNewModel; date: moment.Moment; value: number }>();

  projectsMaxPeriod: moment.Moment[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.projects?.currentValue?.length) {
      this.projectsMaxPeriod = this.getProjectsMaxPeriod(changes.projects.currentValue);
    }
  }

  private getProjectsMaxPeriod(projects: ProjectNewModel[] = []): moment.Moment[] {
    const appProjectsMetadata = projects
      .reduce((acc, i) => [...acc, ...i.metadata], [])
      .map(m => NewProjectUtils.mapMetadataToDate(m))
      .sort((a, b) => (a.isBefore(b) ? -1 : 1));

    if (!appProjectsMetadata || !appProjectsMetadata.length) {
      return [];
    }

    const firstMetadata = appProjectsMetadata[0];
    const lastMetadata = appProjectsMetadata[appProjectsMetadata.length - 1];
    const additionalMonths = 1;
    const monthsPeriod = lastMetadata.diff(firstMetadata, 'months') + additionalMonths;

    return Array.from(Array(monthsPeriod).keys()).map(i => firstMetadata.clone().add(i, 'month'));
  }
}
