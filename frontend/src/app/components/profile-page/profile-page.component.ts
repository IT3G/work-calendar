import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeApiService } from 'src/app/services/api/employee-api.service';
import { ContextStoreService } from '../../store/context-store.service';
import { Employee } from './../../models/employee.model';

@Component({
  selector: 'app-team',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  authInfo$: Observable<any>;
  employees$: Observable<Employee[]>;
  selectedUser: Employee;
  login: string;
  profileForm: FormGroup;
  isAdmin$: Observable<boolean>;
  isEdit: boolean = false;
  getCurrentUserSub: Subscription;

  constructor(
    private contextStoreService: ContextStoreService,
    private route: ActivatedRoute,
    private employeeApi: EmployeeApiService
  ) {}

  ngOnInit() {
    this.getUserInfo();
    this.isAdmin$ = this.contextStoreService.isCurrentUserAdmin$();
  }

  ngOnDestroy() {
    if (this.getCurrentUserSub) this.getCurrentUserSub.unsubscribe();
  }

  private getUserInfo() {
    const login = this.route.snapshot.params.id;
    if (!login) {
      this.getCurrentUserSub = this.contextStoreService.getCurrentUser$().subscribe(res => {
        this.selectedUser = res;
        this.initForm(res);
      });
      return;
    }

    this.employeeApi
      .searchUserByLogin(login)
      .pipe(map(users => users[0]))
      .subscribe((res: Employee) => {
        this.selectedUser = res;
        this.initForm(res);
      });
  }

  private initForm(user: Employee) {
    this.profileForm = new FormGroup({
      id: new FormControl(user._id),
      username: new FormControl(user.username),
      email: new FormControl(user.email),
      projects: new FormControl(user.projects),
      location: new FormControl(user.location),
      telNumber: new FormControl(user.telNumber),
      isAdmin: new FormControl(user.isAdmin)
    });

    this.profileForm.get('username').disable();
    this.profileForm.get('email').disable();
  }

  public onEnter(e: KeyboardEvent) {
    if (e.keyCode === 13) this.onUpdateProfile();
  }

  public onEditProfile() {
    this.isEdit = !this.isEdit;
  }

  public onUpdateProfile() {
    this.isEdit = !this.isEdit;
    this.employeeApi.updateUserInfo(this.profileForm.value);
  }
}
