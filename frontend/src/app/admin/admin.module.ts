import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { EmployeeAddComponent } from './components/employee-list/employee-add/employee-add.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ProjectAddComponent } from './components/projects/project-add/project-add.component';
import { ProjectsComponent } from './components/projects/projects.component';

const components = [
  ProjectsComponent,
  ProjectAddComponent,
  EmployeeListComponent,
  EmployeeAddComponent,
  ConfigurationComponent
];

const entryComponents = [ProjectAddComponent, EmployeeAddComponent];

@NgModule({
  declarations: [...components],
  entryComponents: [...entryComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule]
})
export class AdminModule {}
