import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import * as moment from 'moment';
import { ProjectNewModel } from '../../../../shared/models/project-new.model';
import { NewProjectUtils } from '../../../../shared/utils/new-project.utils';

@Component({
  selector: 'app-profile-projects-table',
  templateUrl: './profile-projects-table.component.html',
  styleUrls: ['./profile-projects-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileProjectsTableComponent implements OnChanges {
  @Input()
  projects: ProjectNewModel[] = [];

  @Input()
  projectsMaxPeriod: moment.Moment[];

  @Input()
  isAdmin: boolean;

  @Output()
  updateValue = new EventEmitter<{ project: ProjectNewModel; date: moment.Moment; value: number }>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.projectsMaxPeriod.currentValue) {
      this.projectsMaxPeriod = [...this.projectsMaxPeriod].reverse();
    }
  }

  getProjectPercentByDate(project: ProjectNewModel, date: moment.Moment) {
    const metadata = project.metadata.find(m => NewProjectUtils.mapMetadataToDate(m).isSame(date, 'month'));

    return metadata?.percent || 0;
  }

  onUpdateValue(project: ProjectNewModel, date: moment.Moment, value: string) {
    this.updateValue.emit({ project, date, value: +value });
  }
}
