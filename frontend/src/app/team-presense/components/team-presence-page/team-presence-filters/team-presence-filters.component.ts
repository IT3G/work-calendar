import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectInputDataModel } from '../../../../shared/components/single-select/single-select.component';

@Component({
  selector: 'app-team-presence-filters',
  templateUrl: './team-presence-filters.component.html',
  styleUrls: ['./team-presence-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamPresenceFiltersComponent {
  @Input()
  filtersForm: FormGroup;

  @Input()
  projects: SelectInputDataModel[];

  @Input()
  jobPositions: SelectInputDataModel[];

  @Input()
  subdivisions: SelectInputDataModel[];

  @Input()
  locations: SelectInputDataModel[];

  @Input()
  projectOffices: SelectInputDataModel[];
}
