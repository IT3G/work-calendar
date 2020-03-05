import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsTeamsComponent } from './projects-teams/projects-teams.component';

import { UserForLocationPipe } from './pipes/user-for-location.pipe';
import { SharedModule } from '../shared/shared.module';
import { UserCardComponent } from './user-card/user-card.component';
import { ColorSubdivisionPipe } from './pipes/color-subdivision.pipe';
import { ProjectTeamsFilterComponent } from './project-teams-filter/project-teams-filter.component';
import { ProjectTeamsFilterPipe } from './pipes/project-teams-filter.pipe';

@NgModule({
  declarations: [
    ProjectsTeamsComponent,
    UserForLocationPipe,
    UserCardComponent,
    ColorSubdivisionPipe,
    ProjectTeamsFilterComponent,
    ProjectTeamsFilterPipe
  ],
  exports: [ColorSubdivisionPipe],
  imports: [CommonModule, SharedModule]
})
export class ProjectsTeamsModule {}
