import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { DictionaryAdminComponent } from './components/dictionary-admin/dictionary-admin.component';
import { EmployeeAddComponent } from './components/employee-list/employee-add/employee-add.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CalendarBlockComponent } from './components/holidays/calendar-block/calendar-block.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { HolidaysYearFilterPipe } from './components/holidays/pipes/holidays-year-filter.pipe';
import { AddPopupComponent } from './components/popups/add-popup/add-popup.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SubdivisionAdmComponent } from './components/subdivision-adm/subdivision-adm.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'holidays', component: HolidaysComponent },
  { path: 'dictionary', component: DictionaryAdminComponent },
  { path: '', redirectTo: 'projects', pathMatch: 'full' }
];

const components = [
  AddPopupComponent,
  EmployeeListComponent,
  EmployeeAddComponent,
  DictionaryAdminComponent,
  HolidaysComponent,
  CalendarBlockComponent,
  SubdivisionAdmComponent,
  SettingsComponent
];

const pieps = [HolidaysYearFilterPipe];

const entryComponents = [AddPopupComponent, EmployeeAddComponent];

@NgModule({
  declarations: [...components, ...pieps],
  entryComponents: [...entryComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)]
})
export class AdminModule {}
