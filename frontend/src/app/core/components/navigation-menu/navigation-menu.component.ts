import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthGuardService } from '../../guards/auth-guard.service';
import { ContextStoreService } from '../../store/context-store.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  public isAuth$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;

  constructor(
    private contextStoreService: ContextStoreService,
    private authGuardService: AuthGuardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAuth$ = this.contextStoreService.getCurrentUser$().pipe(map(user => !!user));
    this.isAdmin$ = this.contextStoreService.isCurrentUserAdmin$();
  }

  public selectCurrentUser(): void {
    this.contextStoreService.getCurrentUser();
  }

  public logout(): void {
    localStorage.removeItem('userSession');
    this.contextStoreService.setCurrentUser(null);
    this.router.navigate(['team-presence']);
    this.authGuardService.isActivated = false;
  }
}
