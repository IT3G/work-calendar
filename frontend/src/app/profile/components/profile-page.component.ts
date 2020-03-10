import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { FollowApiService } from '../../core/services/follow-api.service';
import { ContextStoreService } from '../../core/store/context-store.service';
import { DictionaryModel } from '../../shared/models/dictionary.model';
import { Employee } from '../../shared/models/employee.model';
import { FollowModel, UserFollow } from '../../shared/models/follow.model';
import { SettingsModel } from '../../shared/models/settings.model';

@Component({
  selector: 'app-team',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  public selectedUser: Employee;
  public currentUser$: Observable<Employee>;
  public isAdmin$: Observable<boolean>;
  public canEdit$: Observable<boolean>;
  private login: string;
  public projects: DictionaryModel[];
  public selectedTabIndex = this.route.snapshot.queryParams.tab || 0;

  public users$: Observable<Employee[]>;
  public settings$: Observable<SettingsModel>;

  public userFollow: UserFollow;

  private userSubscriptions = new Subscription();

  constructor(
    private contextStoreService: ContextStoreService,
    private employeeApiService: EmployeeApiService,
    private route: ActivatedRoute,
    private router: Router,
    private followApi: FollowApiService
  ) {}

  ngOnInit() {
    this.users$ = this.employeeApiService.loadAllEmployees();

    this.currentUser$ = this.contextStoreService.getCurrentUser$().pipe(filter(user => !!user));
    this.isAdmin$ = this.contextStoreService.isCurrentUserAdmin$();
    this.settings$ = this.contextStoreService.settings$.pipe(filter(s => !!s));
    this.getUserInfo();
  }

  ngOnDestroy() {
    this.userSubscriptions.unsubscribe();
  }

  public onUpdateProfile(employee: Employee): void {
    this.employeeApiService.updateUserInfo(this.login, employee).subscribe(() => {
      this.loadFollow(this.selectedUser._id);
    });
  }

  public addFollow(data: FollowModel): void {
    this.followApi.addFollow(data).subscribe(res => this.loadFollow(this.selectedUser._id));
  }

  public deleteFollowing(id: string) {
    this.followApi.deleteFollow(id).subscribe(res => this.loadFollow(this.selectedUser._id));
  }

  public getAvatarSrc() {
    return `${environment.baseUrl}/avatar?login=` + this.login;
  }

  public tabChange(id: number) {
    this.router.navigate([], {
      queryParams: { ...this.route.snapshot.queryParams, tab: id }
    });
  }

  private getUserInfo(): void {
    this.userSubscriptions.add(
      this.route.params
        .pipe(switchMap((params: { id?: string }) => (params.id ? this.getUserFromApi(params.id) : this.currentUser$)))
        .subscribe(user => {
          this.selectedUser = user;
          this.login = user.mailNickname;
          this.loadFollow(user._id);
          this.canEdit$ = this.getCanEdit$(user);
        })
    );

    this.userSubscriptions.add(
      this.route.queryParams.pipe(filter(query => !!query.tab)).subscribe(query => (this.selectedTabIndex = query.tab))
    );
  }

  private getCanEdit$(user: Employee): Observable<boolean> {
    return combineLatest([this.isAdmin$, this.currentUser$]).pipe(
      map(([isAdmin, currentUser]) => {
        if (isAdmin) {
          return true;
        }

        return user && currentUser && user.mailNickname === currentUser.mailNickname;
      })
    );
  }

  private getUserFromApi(login) {
    return this.employeeApiService.searchUserByLogin(login);
  }

  public loadFollow(userId: string) {
    this.userSubscriptions.add(this.followApi.getUserFollow(userId).subscribe(res => (this.userFollow = res)));
  }
}
