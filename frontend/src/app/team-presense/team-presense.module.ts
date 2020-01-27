import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TeamPresenceFiltersComponent } from './components/team-presence-page/team-presence-filters/team-presence-filters.component';
import { TeamPresencePageComponent } from './components/team-presence-page/team-presence-page.component';
import { PresenceFilterPipe } from './pipes/presence-filter.pipe';

const components = [TeamPresencePageComponent, TeamPresenceFiltersComponent];
const pipes = [PresenceFilterPipe];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, SharedModule]
})
export class TeamPresenseModule {}
