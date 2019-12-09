import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DictionaryModel } from '../../../../shared/models/dictionary.model';
import { LocationEnum } from '../../../../shared/models/location.enum';

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
  projects: DictionaryModel[];

  @Input()
  jobPositions: DictionaryModel[];

  @Input()
  subdivisions: DictionaryModel[];

  @Input()
  locations: LocationEnum[];
}
