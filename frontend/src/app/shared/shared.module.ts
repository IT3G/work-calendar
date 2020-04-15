import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpringSpinnerModule } from 'angular-epic-spinners';
import { AvatarModule } from 'ngx-avatar';
import { MaterialModule } from '../material.module';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FileInputResetComponent } from './components/file-input-reset/file-input-reset.component';
import { MonthSelectorComponent } from './components/month-selector/month-selector.component';
import { ProjectTeamsFilterComponent } from './components/project-teams-filter/project-teams-filter.component';
import { RadioButtonGroupComponent } from './components/radio-button-group/radio-button-group.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { SingleSelectComponent } from './components/single-select/single-select.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { pipes } from './pipes';

const modules = [
  CommonModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  AvatarModule,
  NgbModule,
  RouterModule,
  SpringSpinnerModule
];

const components = [
  AgendaComponent,
  FileInputResetComponent,
  MonthSelectorComponent,
  RadioButtonComponent,
  RadioButtonGroupComponent,
  SingleSelectComponent,
  DropdownComponent,
  UserCardComponent,
  ProjectTeamsFilterComponent
];

const directives = [ClickOutsideDirective];

/** Приватные компоненты попапов наружу предоставлять через сервисы */
const privateComponents = [ConfirmDialogComponent];

@NgModule({
  declarations: [...pipes, ...components, ...privateComponents, ...directives],
  imports: [...modules],
  entryComponents: [...privateComponents],
  exports: [...pipes, ...modules, ...components]
})
export class SharedModule {}
