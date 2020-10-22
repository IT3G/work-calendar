import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { environment } from '../../environments/environment';
import { AuthGuardService as AuthGuard } from '../core/guards/auth-guard.service';
import { IsAdminGuardService } from '../core/guards/is-admin-guard.service';
import { LoginPageComponent } from '../login/components/login-page/login-page.component';
import { RegistrationComponent } from '../login/components/registration/registration.component';
import { PeoplePageComponent } from '../people/components/people-page/people-page.component';
import { PresencePageComponent } from '../presense/components/presence-page/presence-page.component';
import { ProfilePageComponent } from '../profile/components/profile-page.component';
import { ProjectsTeamsComponent } from '../projects-teams/projects-teams/projects-teams.component';
import { TeamPresencePageComponent } from '../team-presense/components/team-presence-page/team-presence-page.component';

const swipebleRoutes: string[] = ['/presence', '/team-presence', '/profile'];

const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'presence', component: PresencePageComponent, canActivate: [AuthGuard] },
  { path: 'presence/:id', component: PresencePageComponent, canActivate: [AuthGuard] },
  { path: 'team-presence', component: TeamPresencePageComponent, canActivate: [AuthGuard] },
  { path: 'projects-teams', component: ProjectsTeamsComponent, canActivate: [AuthGuard] },
  { path: 'people', component: PeoplePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admin', loadChildren: '../admin/admin.module#AdminModule', canActivate: [AuthGuard, IsAdminGuardService] },
  { path: '', redirectTo: 'team-presence', pathMatch: 'full' },
];

@NgModule({
  /** Для тестового стенда используем хэши в роуте. Для остальных нет */
  imports: [RouterModule.forRoot(routes, { useHash: environment.envName === 'test' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  public static getNext(router: Router, increment: number): string {
    const current = router.url; // '/presence'
    const idx = Math.abs(swipebleRoutes.indexOf(current) + increment) % swipebleRoutes.length;
    return swipebleRoutes[idx];
  }
}
