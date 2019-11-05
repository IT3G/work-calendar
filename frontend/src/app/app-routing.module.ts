import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'src/app/components/login-page/login-page.component';
import { TeamPresencePageComponent } from 'src/app/components/team-presence-page/team-presence-page.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { PresencePageComponent } from './components/presence-page/presence-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';

const swipebleRoutes: string[] = ['/presence', '/team-presence', '/profile'];

const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'presence', component: PresencePageComponent, canActivate: [AuthGuard] },
  { path: 'presence/:id', component: PresencePageComponent, canActivate: [AuthGuard] },
  { path: 'team-presence', component: TeamPresencePageComponent },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'app-configuration', component: ConfigurationComponent, canActivate: [AuthGuard] },
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
