import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TeamPresenceFiltersComponent } from './components/team-presence-page/team-presence-filters/team-presence-filters.component';
import { TeamPresencePageComponent } from './components/team-presence-page/team-presence-page.component';
import { TeamPresenceTableComponent } from './components/team-presence-page/team-presence-table/team-presence-table.component';
import { GetDateFromIndexPipe } from './pipes/get-date-from-index.pipe';

const components = [TeamPresencePageComponent, TeamPresenceFiltersComponent];
const pipes = [];

@NgModule({
  declarations: [...components, ...pipes, TeamPresenceTableComponent, GetDateFromIndexPipe],
  imports: [CommonModule, SharedModule],
})
export class TeamPresenseModule {}
