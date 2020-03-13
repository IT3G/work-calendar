import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ToggleButtonDataModel } from '../../shared/components/radio-button-group/radio-button-group.model';
import { ProjectDataModel } from '../models/project-data.model';

@Component({
  selector: 'app-projects-title',
  templateUrl: './projects-title.component.html',
  styleUrls: ['./projects-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsTitleComponent {
  @Input()
  project: ProjectDataModel[];

  @Input()
  subdivisionData: ToggleButtonDataModel[];
}
