import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Employee } from '../../../shared/models/employee.model';
import { SettingsModel } from '../../../shared/models/settings.model';
import { ContextStoreService } from '../../store/context-store.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  public isAuth$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;

  public settings$: Observable<SettingsModel>;
  public selectedUser$: Observable<Employee>;

  @Input()
  isMobile: boolean;

  constructor(private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.isAuth$ = this.contextStoreService.getCurrentUser$().pipe(map(user => !!user));
    this.isAdmin$ = this.contextStoreService.isCurrentUserAdmin$();
    this.settings$ = this.contextStoreService.settings$.pipe(filter(s => !!s));
    this.selectedUser$ = this.contextStoreService.getCurrentUser$();
  }
}
