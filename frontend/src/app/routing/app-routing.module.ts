import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../core/guards/auth-guard.service';
import { IsAdminGuardService } from '../core/guards/is-admin-guard.service';
import { LoginPageComponent } from '../login/components/login-page.component';
import { RegistrationComponent } from '../login/registration/registration.component';
import { PresencePageComponent } from '../presense/components/presence-page/presence-page.component';
import { ProfilePageComponent } from '../profile/components/profile-page.component';
import { TeamPresencePageComponent } from '../team-presense/components/team-presence-page/team-presence-page.component';

const swipebleRoutes: string[] = ['/presence', '/team-presence', '/profile'];

const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'presence', component: PresencePageComponent, canActivate: [AuthGuard] },
  { path: 'presence/:id', component: PresencePageComponent, canActivate: [AuthGuard] },
  { path: 'team-presence', component: TeamPresencePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admin', loadChildren: '../admin/admin.module#AdminModule', canActivate: [AuthGuard, IsAdminGuardService] },
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
