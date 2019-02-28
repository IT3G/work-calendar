import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { TeamPresenceComponent } from 'src/app/components/team-presence/team-presence.component';
import { PresenceComponent } from './components/presence/presence.component';
import { TeamComponent } from './components/team/team.component';

const swipebleRoutes: string[] = ['/presence', '/team'];

const routes: Routes = [
  { path: 'team', component: TeamComponent },
  { path: 'presence', component: PresenceComponent },
  { path: 'team-presence', component: TeamPresenceComponent },
  { path: 'presence/:id', component: PresenceComponent },
  { path: '', redirectTo: 'presence', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static getNext(router: Router, increment: number): string {
    const current = router.url; // '/presence'
    const idx = Math.abs(swipebleRoutes.indexOf(current) + increment) % swipebleRoutes.length;
    return swipebleRoutes[idx];
  }
}
