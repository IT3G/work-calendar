import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ColorSubdivisionPipe } from './pipes/color-subdivision.pipe';
import { ProjectTeamsFilterPipe } from './pipes/project-teams-filter.pipe';
import { ProjectTeamsTerminatedEmployeesFilterPipe } from './pipes/project-teams-terminated-employees-filter.pipe';
import { UserForLocationPipe } from './pipes/user-for-location.pipe';
import { UsersQuantityByProjectPipe } from './pipes/users-quantity-by-project.pipe';
import { UsersQuantityBySubdivisionPipe } from './pipes/users-quantity-by-subdivision.pipe';
import { ProjectTeamsFilterComponent } from './project-teams-filter/project-teams-filter.component';
import { ProjectsTeamsComponent } from './projects-teams/projects-teams.component';
import { ProjectsTitleComponent } from './projects-title/projects-title.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserForLocationTableComponent } from './user-for-location-table/user-for-location-table.component';

@NgModule({
  declarations: [
    ProjectsTeamsComponent,
    UserForLocationPipe,
    UserCardComponent,
    UsersQuantityBySubdivisionPipe,
    UsersQuantityByProjectPipe,
    ColorSubdivisionPipe,
    ProjectTeamsFilterComponent,
    ProjectTeamsFilterPipe,
    ProjectTeamsTerminatedEmployeesFilterPipe,
    ProjectsTitleComponent,
    UserForLocationTableComponent
  ],
  exports: [ColorSubdivisionPipe],
  imports: [CommonModule, SharedModule]
})
export class ProjectsTeamsModule {}
