import { PresenceComponent } from './presence/presence.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: 'team', component: TeamComponent },
  { path: 'presence', component: PresenceComponent },
  { path: '', redirectTo: '/presence', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
