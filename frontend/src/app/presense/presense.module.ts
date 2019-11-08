import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CurrentDayComponent } from './components/current-day/current-day.component';
import { DescriptionHistoryComponent } from './components/description-history/description-history.component';
import { DescriptionComponent } from './components/description/description.component';
import { PresencePageComponent } from './components/presence-page/presence-page.component';

const components = [
  CalendarComponent,
  CurrentDayComponent,
  DescriptionComponent,
  DescriptionHistoryComponent,
  PresencePageComponent
];
@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule]
})
export class PresenseModule {}
