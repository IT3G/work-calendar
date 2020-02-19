import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatar';
import { MaterialModule } from '../material.module';
import { AgendaComponent } from './components/agenda/agenda.component';
import { FileInputResetComponent } from './components/file-input-reset/file-input-reset.component';
import { MonthSelectorComponent } from './components/month-selector/month-selector.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { pipes } from './pipes';

const modules = [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, AvatarModule, NgbModule, RouterModule];

const components = [AgendaComponent, FileInputResetComponent, MonthSelectorComponent];
/** Приватные компоненты попапов наружу предоставлять через сервисы */
const privateComponents = [ConfirmDialogComponent];

@NgModule({
  declarations: [...pipes, ...components, ...privateComponents],
  imports: [...modules],
  entryComponents: [...privateComponents],
  exports: [...pipes, ...modules, ...components]
})
export class SharedModule {}
