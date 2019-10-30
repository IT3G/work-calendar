import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { ContextStoreService } from 'src/app/store/context-store.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  currentUser$: Observable<Employee>;
  isAuth$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private contextStoreService: ContextStoreService, private router: Router) {}

  ngOnInit() {
    this.currentUser$ = this.contextStoreService.getCurrentUser$();
    this.isAuth$ = this.contextStoreService.getCurrentUser$().pipe(map(user => !!user));
    this.isAdmin$ = this.contextStoreService.isCurrentUserAdmin$();
  }

  public selectCurrentUser() {
    this.contextStoreService.getCurrentUser();
  }

  public logout() {
    localStorage.removeItem('userSession');
    this.contextStoreService.setCurrentUser(null);
    this.router.navigate(['team-presence']);
  }
}
