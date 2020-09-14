import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProjectTeamsFilterPipe } from './pipes/project-teams-filter.pipe';
import { ProjectTeamsTerminatedEmployeesFilterPipe } from './pipes/project-teams-terminated-employees-filter.pipe';
import { UserForSubdivisionPipe } from './pipes/user-for-subdivison.pipe';
import { UsersQuantityByProjectPipe } from './pipes/users-quantity-by-project.pipe';
import { UsersQuantityBySubdivisionPipe } from './pipes/users-quantity-by-subdivision.pipe';
import { ProjectsTeamsComponent } from './projects-teams/projects-teams.component';
import { TeamsFiltersComponent } from './projects-teams/teams-filters/teams-filters.component';
import { ProjectsTitleComponent } from './projects-title/projects-title.component';

@NgModule({
  declarations: [
    ProjectsTeamsComponent,
    ProjectTeamsFilterPipe,
    UsersQuantityBySubdivisionPipe,
    UsersQuantityByProjectPipe,
    ProjectTeamsTerminatedEmployeesFilterPipe,
    ProjectsTitleComponent,
    UserForSubdivisionPipe,
    TeamsFiltersComponent,
  ],
  exports: [],
  imports: [CommonModule, SharedModule],
})
export class ProjectsTeamsModule {}
