import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthApiService } from '../../services/auth-api.service';
import { ContextStoreService } from '../../store/context-store.service';
import { AuthSetting } from '../../../shared/models/auth-setting.model';
import { Employee } from '../../../shared/models/employee.model';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  public isAuth$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;

  public settings$: Observable<AuthSetting>;
  public selectedUser$: Observable<Employee>;

  constructor(
    private contextStoreService: ContextStoreService,
    private router: Router,
    private authApi: AuthApiService
  ) {}

  ngOnInit() {
    this.isAuth$ = this.contextStoreService.getCurrentUser$().pipe(map(user => !!user));
    this.isAdmin$ = this.contextStoreService.isCurrentUserAdmin$();
    this.settings$ = this.contextStoreService.settings$.pipe(filter(s => !!s));
    this.selectedUser$ = this.contextStoreService.getCurrentUser$();
  }
}
