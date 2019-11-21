import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { EmployeeAddComponent } from './components/employee-list/employee-add/employee-add.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { JobPositionAdministrationComponent } from './components/job-position-administration/job-position-administration.component';
import { ProjectAddComponent } from './components/projects/project-add/project-add.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'app-configuration', component: ConfigurationComponent },
  { path: 'job-position', component: JobPositionAdministrationComponent },
  { path: '', redirectTo: 'projects', pathMatch: 'full' }
];

const components = [
  ProjectsComponent,
  ProjectAddComponent,
  EmployeeListComponent,
  EmployeeAddComponent,
  ConfigurationComponent,
  JobPositionAdministrationComponent
];

const entryComponents = [ProjectAddComponent, EmployeeAddComponent];

@NgModule({
  declarations: [...components],
  entryComponents: [...entryComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)]
})
export class AdminModule {}
