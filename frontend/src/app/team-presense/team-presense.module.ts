import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TeamPresencePageComponent } from './components/team-presence-page/team-presence-page.component';

const components = [TeamPresencePageComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule]
})
export class TeamPresenseModule {}
