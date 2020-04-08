import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputFileModule } from 'ngx-input-file';
import { SharedModule } from '../shared/shared.module';
import { PeoplePageComponent } from './components/people-page/people-page.component';

@NgModule({
  declarations: [PeoplePageComponent],
  exports: [],
  imports: [CommonModule, SharedModule, InputFileModule]
})
export class PeopleModule {}
