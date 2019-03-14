import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContextStoreService } from 'src/app/store/context-store.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  currentUser$: Observable<Employee>;
  isAuth$: Observable<boolean>;

  constructor(private contextStoreService: ContextStoreService, private authService: AuthService) {}

  ngOnInit() {
    this.currentUser$ = this.contextStoreService.getCurrentUser$();
    this.isAuth$ = this.authService.isAuth();
  }

  selectCurrentUser() {
    this.contextStoreService.setSelectedUser(this.contextStoreService.getCurrentUser());
  }

  logout() {
    this.authService.logout();
  }
}
