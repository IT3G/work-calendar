import { PresenceComponent } from './presence/presence.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { TeamComponent } from './team/team.component';

const swipebleRoutes: string[] = ['/presence', '/team'];

const routes: Routes = [
  { path: 'team', component: TeamComponent },
  { path: 'presence', component: PresenceComponent },
  { path: 'presence/:id', component: PresenceComponent },
  { path: '', redirectTo: 'presence', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static getNext(router: Router, increment: number): string {
    const current = router.url; // '/presence'
    const idx = Math.abs(swipebleRoutes.indexOf(current) + increment) % swipebleRoutes.length;
    return swipebleRoutes[idx];
  }
}
