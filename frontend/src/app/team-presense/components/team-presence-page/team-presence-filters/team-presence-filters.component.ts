import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JobPositionModel } from '../../../../shared/models/job-position.model';
import { LocationEnum } from '../../../../shared/models/location.enum';
import { ProjectModel } from '../../../../shared/models/projects.model';

@Component({
  selector: 'app-team-presence-filters',
  templateUrl: './team-presence-filters.component.html',
  styleUrls: ['./team-presence-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPresenceFiltersComponent {
  @Input()
  filtersForm: FormGroup;

  @Input()
  projects: ProjectModel[];

  @Input()
  jobPositions: JobPositionModel[];

  @Input()
  locations: LocationEnum[];
}
