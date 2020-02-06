import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsTeamsComponent } from './projects-teams/projects-teams.component';

import { UserForLocationPipe } from './pipes/user-for-location.pipe';
import { SharedModule } from '../shared/shared.module';
import { ActiveProjectForDatePipe } from './pipes/active-project-for-date.pipe';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [ProjectsTeamsComponent, UserForLocationPipe, ActiveProjectForDatePipe, UserCardComponent],
  imports: [CommonModule, SharedModule]
})
export class ProjectsTeamsModule {}
