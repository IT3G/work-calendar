import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputFileModule } from 'ngx-input-file';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CurrentDayComponent } from './components/current-day/current-day.component';
import { DescriptionComponent } from './components/description/description.component';
import { PresenceHistoryComponent } from './components/presence-history/presence-history.component';
import { PresencePageComponent } from './components/presence-page/presence-page.component';
import { UsernameUpdateComponent } from './components/username-update-dialog/username-update-dialog.component';
import { VacationResolutionComponent } from './components/vacation-resolution/vacation-resolution.component';

const components = [
  CalendarComponent,
  CurrentDayComponent,
  DescriptionComponent,
  PresencePageComponent,
  PresenceHistoryComponent,
  VacationResolutionComponent,
  UsernameUpdateComponent
];
@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule, InputFileModule]
})
export class PresenseModule {}
