import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';

import { InputFileModule } from 'ngx-input-file';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { DictionaryAdminComponent } from './components/dictionary-admin/dictionary-admin.component';
import { EmployeeAddComponent } from './components/employee-list/employee-add/employee-add.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CalendarBlockComponent } from './components/holidays/calendar-block/calendar-block.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { HolidaysYearFilterPipe } from './components/holidays/pipes/holidays-year-filter.pipe';
import { AddPopupComponent } from './components/popups/add-popup/add-popup.component';
import { AddProjectToProfilePopupComponent } from './components/popups/add-project-to-profile-popup/add-project-to-profile-popup.component';
import { AddSkillPopupComponent } from './components/popups/add-skill-popup/add-skill-popup.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SkillsAdminComponent } from './components/skills-admin/skills-admin.component';
import { SubdivisionAdmComponent } from './components/subdivision-adm/subdivision-adm.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'holidays', component: HolidaysComponent },
  { path: 'dictionary', component: DictionaryAdminComponent },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'skills', component: SkillsAdminComponent },
];

const components = [
  AddPopupComponent,
  EmployeeListComponent,
  EmployeeAddComponent,
  DictionaryAdminComponent,
  HolidaysComponent,
  CalendarBlockComponent,
  SubdivisionAdmComponent,
  SettingsComponent,
  SkillsAdminComponent,
  AddSkillPopupComponent,
  AddProjectToProfilePopupComponent,
];

const pieps = [HolidaysYearFilterPipe];

const entryComponents = [AddPopupComponent, EmployeeAddComponent];

@NgModule({
  declarations: [...components, ...pieps],
  entryComponents: [...entryComponents],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    InputFileModule,
    RouterModule.forChild(routes),
  ],
  exports: [CommonModule],
})
export class AdminModule {}
