import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'src/app/components/login-page/login-page.component';
import { RegisterPageComponent } from 'src/app/components/register-page/register-page.component';
import { TeamPresencePageComponent } from 'src/app/components/team-presence-page/team-presence-page.component';
import { PresencePageComponent } from './components/presence-page/presence-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const swipebleRoutes: string[] = ['/presence', '/team'];

const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'presence', component: PresencePageComponent },
  { path: 'team-presence', component: TeamPresencePageComponent },
  { path: 'presence/:id', component: PresencePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
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
