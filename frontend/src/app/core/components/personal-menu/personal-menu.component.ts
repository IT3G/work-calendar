import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSetting } from '../../../shared/models/auth-setting.model';
import { Employee } from '../../../shared/models/employee.model';
import { ContextStoreService } from '../../store/context-store.service';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  styleUrls: ['./personal-menu.component.scss']
})
export class PersonalMenuComponent implements OnInit {
  @Input()
  public color: string;

  @HostBinding('style.--color')
  public get isExample(): string {
    return this.color;
  }

  public isAuth$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;

  public settings$: Observable<AuthSetting>;
  public selectedUser$: Observable<Employee>;

  constructor(private contextStoreService: ContextStoreService, private router: Router) {}

  ngOnInit() {
    this.isAuth$ = this.contextStoreService.getCurrentUser$().pipe(map(user => !!user));
    this.isAdmin$ = this.contextStoreService.isCurrentUserAdmin$();
    this.settings$ = this.contextStoreService.settings$.pipe(filter(s => !!s));
    this.selectedUser$ = this.contextStoreService.getCurrentUser$();
  }

  public logout(): void {
    localStorage.removeItem('Authorization');
    this.contextStoreService.setCurrentUser(null);
    this.router.navigate(['login']);
  }
}
