import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputFileModule } from 'ngx-input-file';

import { SharedModule } from '../shared/shared.module';
import { PeoplePageComponent } from './components/people-page/people-page.component';
import { PeopleSubdivisonFilterPipe } from './pipes/people-subdivison-filter.pipe';
import { SortLocationBySubdivisionPipe } from './pipes/sort-location-by-subdivition.pipe';

@NgModule({
  declarations: [PeoplePageComponent, PeopleSubdivisonFilterPipe, SortLocationBySubdivisionPipe],
  exports: [],
  imports: [CommonModule, SharedModule, InputFileModule],
})
export class PeopleModule {}
