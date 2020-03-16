import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsTeamsComponent } from './projects-teams/projects-teams.component';

import { UserForLocationPipe } from './pipes/user-for-location.pipe';
import { SharedModule } from '../shared/shared.module';
import { UserCardComponent } from './user-card/user-card.component';
import { ColorSubdivisionPipe } from './pipes/color-subdivision.pipe';
import { ProjectTeamsFilterComponent } from './project-teams-filter/project-teams-filter.component';
import { ProjectTeamsFilterPipe } from './pipes/project-teams-filter.pipe';
import { UsersQuantityBySubdivisionPipe } from './pipes/users-quantity-by-subdivision.pipe';
import { ProjectTeamsTerminatedEmployeesFilterPipe } from './pipes/project-teams-terminated-employees-filter.pipe';
import { ProjectsTitleComponent } from './projects-title/projects-title.component';

@NgModule({
  declarations: [
    ProjectsTeamsComponent,
    UserForLocationPipe,
    UserCardComponent,
    UsersQuantityBySubdivisionPipe,
    ColorSubdivisionPipe,
    ProjectTeamsFilterComponent,
    ProjectTeamsFilterPipe,
    ProjectTeamsTerminatedEmployeesFilterPipe,
    ProjectsTitleComponent
  ],
  exports: [ColorSubdivisionPipe],
  imports: [CommonModule, SharedModule]
})
export class ProjectsTeamsModule {}
