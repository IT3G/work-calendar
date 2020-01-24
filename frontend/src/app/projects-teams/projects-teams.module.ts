import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsTeamsComponent } from './projects-teams/projects-teams.component';
import { UserForProjectsPipe } from './pipes/user-for-projects.pipe';
import { UserForLocationPipe } from './pipes/user-for-location.pipe';

@NgModule({
  declarations: [ProjectsTeamsComponent, UserForProjectsPipe, UserForLocationPipe],
  imports: [
    CommonModule
  ]
})
export class ProjectsTeamsModule { }
