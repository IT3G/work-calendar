import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeeApiService } from 'src/app/services/api/employee-api.service';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';
import { ProjectModel } from '../../models/projects.model';
import { ProjectsApiService } from '../../services/api/projects-api.service';
import { ContextStoreService } from '../../store/context-store.service';
import { Employee } from './../../models/employee.model';

@Component({
  selector: 'app-team',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  public selectedUser: Employee;
  public profileForm: FormGroup;
  public isAdmin$: Observable<boolean>;
  public isEdit: boolean = false;
  public canEdit: boolean = true;
  private login: string;
  private getCurrentUserSub = new Subscription();
  private searchUserByLoginSub = new Subscription();
  public projects$: Observable<ProjectModel[]>;
  constructor(
    private contextStoreService: ContextStoreService,
    private employeeApiService: EmployeeApiService,
    private employeeStoreService: EmployeeStoreService,
    private route: ActivatedRoute,
    private projectsApi: ProjectsApiService
  ) {}

  ngOnInit() {
    this.getUserInfo();
    this.isAdmin$ = this.contextStoreService.isCurrentUserAdmin$();
    this.projects$ = this.projectsApi.getProjects();
  }

  ngOnDestroy() {
    this.getCurrentUserSub.unsubscribe();
    this.searchUserByLoginSub.unsubscribe();
  }

  public onEnter(e: KeyboardEvent): void {
    if (e.keyCode === 13) this.onUpdateProfile();
  }

  public editStart(): void {
    this.profileForm.get('projects').enable();
    this.profileForm.get('location').enable();
    this.profileForm.get('telNumber').enable();
    this.profileForm.get('isAdmin').enable();
    this.profileForm.get('hasMailing').enable();
    this.profileForm.get('subdivision').enable();

    this.isEdit = true;
  }

  public onUpdateProfile(): void {
    this.employeeApiService.updateUserInfo(this.login, this.profileForm.value).subscribe(() => {
      this.cancelEdit();
      this.contextStoreService.update();
      this.employeeStoreService.update();
    });
  }

  public cancelEdit(): void {
    this.profileForm.disable();
    this.isEdit = false;
  }

  private getUserInfo(): void {
    this.login = this.route.snapshot.params.id;
    if (!this.login) {
      this.getCurrentUserSub.add(
        this.contextStoreService
          .getCurrentUser$()
          .pipe(filter(user => !!user))
          .subscribe(user => {
            this.initForm(user);
            this.setSelectedUser(user);
            this.login = user.mailNickname;
          })
      );

      return;
    } else {
      this.searchUserByLoginSub.add(
        this.employeeApiService
          .searchUserByLogin(this.login)
          .pipe(map(users => users[0]))
          .subscribe((user: Employee) => {
            this.initForm(user);
            this.setSelectedUser(user);
            this.canEdit = false;
          })
      );
    }
  }

  private initForm(user: Employee): void {
    this.profileForm = new FormGroup({
      id: new FormControl(user._id),
      username: new FormControl(user.username),
      email: new FormControl(user.email),
      projects: new FormControl(user.projects),
      location: new FormControl(user.location),
      telNumber: new FormControl(user.telNumber),
      isAdmin: new FormControl(user.isAdmin),
      hasMailing: new FormControl(user.hasMailing),
      subdivision: new FormControl(user.subdivision ? user.subdivision : null)
    });
    this.profileForm.disable();
  }

  private setSelectedUser(user: Employee): void {
    this.selectedUser = user;
  }
}
