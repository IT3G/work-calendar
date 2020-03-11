import { Component, Input } from '@angular/core';
import { ProjectNewModel } from '../../../shared/models/project-new.model';

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.scss']
})
export class ProfileProjectsComponent {
  @Input()
  projects: ProjectNewModel[] = [];
}
