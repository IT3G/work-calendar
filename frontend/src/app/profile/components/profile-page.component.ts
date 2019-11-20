import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { ProjectsApiService } from '../../core/services/projects-api.service';
import { TaskApiService } from '../../core/services/task-api.service';
import { ContextStoreService } from '../../core/store/context-store.service';
import { EmployeeStoreService } from '../../core/store/employee-store.service';
import { DayType } from '../../shared/const/day-type.const';
import { Employee } from '../../shared/models/employee.model';
import { ProjectModel } from '../../shared/models/projects.model';
import { TaskModel } from '../../shared/models/tasks.models';

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
  public taskHistory$: Observable<TaskModel[]>;
  public activity: TaskModel[];
  public dayType = DayType;
  public displayedColumns: string[];
  public users$: Observable<Employee[]>;
  constructor(
    private contextStoreService: ContextStoreService,
    private employeeApiService: EmployeeApiService,
    private employeeStoreService: EmployeeStoreService,
    private route: ActivatedRoute,
    private projectsApi: ProjectsApiService,
    private taskApi: TaskApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.users$ = this.employeeApiService.loadAllEmployees();
    this.displayedColumns = ['dateCreate', 'date', 'who', 'type', 'comment'];
    this.getUserInfo();
    this.isAdmin$ = this.contextStoreService.isCurrentUserAdmin$();
    this.projects$ = this.projectsApi.getProjects();
  }

  ngOnDestroy() {
    this.getCurrentUserSub.unsubscribe();
    this.searchUserByLoginSub.unsubscribe();
  }

  public createProjectsFormGroup(project: any): FormGroup {
    return this.fb.group({
      title: project.title,
      dateStart: project.dateStart,
      dateEnd: project.dateEnd
    });
  }

  public createEmptyProjectsFormGroup(): FormGroup {
    return this.fb.group({
      title: null,
      dateStart: null,
      dateEnd: null
    });
  }

  public get projectFormArray(): FormArray {
    return this.profileForm.get('projects') as FormArray;
  }

  public addProjectFromGroup(): void {
    const formArray = this.projectFormArray;
    formArray.controls.push(this.createEmptyProjectsFormGroup());
  }

  public onEnter(e: KeyboardEvent): void {
    if (e.keyCode === 13) this.onUpdateProfile();
  }

  public removeFormGroupProject(index: number): void {
    this.projectFormArray.removeAt(index);
  }

  public hasDateRange(task: TaskModel): boolean {
    return !moment(task.dateStart).isSame(moment(task.dateEnd));
  }

  public editStart(): void {
    this.profileForm.get('projects').enable();
    this.profileForm.get('location').enable();
    this.profileForm.get('telNumber').enable();
    this.profileForm.get('isAdmin').enable();
    this.profileForm.get('hasMailing').enable();
    this.profileForm.get('subdivision').enable();
    this.profileForm.get('jobPosition').enable();
    this.isEdit = true;
  }

  public onUpdateProfile(): void {
    this.employeeApiService.updateUserInfo(this.login, this.profileForm.getRawValue()).subscribe(() => {
      this.cancelEdit();
      this.contextStoreService.update();
      this.employeeStoreService.update();
    });
  }

  public cancelEdit(): void {
    this.profileForm.disable();
    this.isEdit = false;
  }

  public getAvatarSrc() {
    return `/backend/avatar?login=` + this.login;
  }

  private getUserInfo(): void {
    this.login = this.route.snapshot.params.id;
    if (!this.login) {
      this.getUserFromStore();
    } else {
      this.getUserFromApi();
    }
  }

  private getUserFromApi() {
    this.searchUserByLoginSub.add(
      this.employeeApiService
        .searchUserByLogin(this.login)
        .pipe(map(users => users[0]))
        .subscribe((user: Employee) => {
          this.initForm(user);
          this.setSelectedUser(user);
          this.canEdit = false;
          this.loadTasks(user.mailNickname);
        })
    );
  }

  private getUserFromStore() {
    this.getCurrentUserSub.add(
      this.contextStoreService
        .getCurrentUser$()
        .pipe(filter(user => !!user))
        .subscribe(user => {
          this.initForm(user);
          this.setSelectedUser(user);
          this.login = user.mailNickname;
          this.loadTasks(user.mailNickname);
        })
    );
  }

  public loadTasks(user: string): void {
    this.taskHistory$ = this.taskApi.loadAllTasksByAuthor(user);
    combineLatest(this.users$, this.taskHistory$)
      .pipe(filter(([users, tasks]) => !!users.length && !!tasks.length))
      .subscribe(
        ([users, tasks]) =>
          (this.activity = tasks.map(task => {
            const user = users.find(user => user.mailNickname === task.employee);
            task.employee = user.username;
            return task;
          }))
      );
  }

  private initForm(user: Employee): void {
    this.profileForm = this.fb.group({
      id: new FormControl(user._id),
      username: new FormControl(user.username),
      email: new FormControl(user.email),
      projects: this.fb.array(user.projects.map(project => this.createProjectsFormGroup(project))),
      location: new FormControl(user.location),
      telNumber: new FormControl(user.telNumber),
      isAdmin: new FormControl(user.isAdmin),
      hasMailing: new FormControl(user.hasMailing),
      jobPosition: new FormControl(user.jobPosition ? user.jobPosition : null),
      subdivision: new FormControl(user.subdivision ? user.subdivision : null)
    });
    this.profileForm.disable();
  }

  private setSelectedUser(user: Employee): void {
    this.selectedUser = user;
  }
}
