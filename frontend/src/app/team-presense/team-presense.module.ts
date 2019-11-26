import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MonthSelectorComponent } from './components/team-presence-page/month-selector/month-selector.component';
import { TeamPresenceFiltersComponent } from './components/team-presence-page/team-presence-filters/team-presence-filters.component';
import { TeamPresencePageComponent } from './components/team-presence-page/team-presence-page.component';

const components = [TeamPresencePageComponent, TeamPresenceFiltersComponent, MonthSelectorComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule]
})
export class TeamPresenseModule {}
