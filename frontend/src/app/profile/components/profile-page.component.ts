import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, forkJoin, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DictionaryApiService } from '../../core/services/dictionary-api.service';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { TaskApiService } from '../../core/services/task-api.service';
import { ContextStoreService } from '../../core/store/context-store.service';
import { EmployeeStoreService } from '../../core/store/employee-store.service';
import { DayType } from '../../shared/const/day-type.const';
import { DictionaryModel } from '../../shared/models/dictionary.model';
import { Employee } from '../../shared/models/employee.model';
import { TaskModel } from '../../shared/models/tasks.models';
import { SendingMailService } from '../../shared/services/sending-mail.service';
import { AuthSetting } from '../../shared/models/auth-setting.model';
import { FollowApiService } from '../../core/services/follow-api.service';
import { FollowModel } from '../../shared/models/follow.model';

@Component({
  selector: 'app-team',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  public selectedUser: Employee;
  public profileForm: FormGroup;
  public isAdmin$: Observable<boolean>;
  public isEdit = false;
  public canEdit = true;
  private login: string;
  private getCurrentUserSub = new Subscription();
  private searchUserByLoginSub = new Subscription();
  public projects: DictionaryModel[];
  public taskHistory$: Observable<TaskModel[]>;
  public activity: TaskModel[];
  public dayType = DayType;

  public jobPositions: DictionaryModel[];
  public subdivisions: DictionaryModel[];

  public following: Employee[];
  public followers: Employee[];

  public removedFollowing: FollowModel[];
  public addedFollowing: FollowModel[];
  public allForMe: FollowModel[];

  public followingForm: FormControl;

  public users$: Observable<Employee[]>;
  public mailingAddresses: Employee[];
  public settings$: Observable<AuthSetting>;

  constructor(
    private contextStoreService: ContextStoreService,
    private employeeApiService: EmployeeApiService,
    private employeeStoreService: EmployeeStoreService,
    private route: ActivatedRoute,
    private dictionaryApi: DictionaryApiService,
    private followApi: FollowApiService,
    private taskApi: TaskApiService,
    private fb: FormBuilder,
    private sendingMail: SendingMailService
  ) {
  }

  ngOnInit() {
    this.users$ = this.employeeApiService.loadAllEmployees();
    this.followingForm = new FormControl();

    this.getUserInfo();
    this.isAdmin$ = this.contextStoreService.isCurrentUserAdmin$();
    this.dictionaryApi.getAll('project').subscribe(p => (this.projects = p));
    this.settings$ = this.contextStoreService.settings$.pipe(
      filter(s => !!s)
    );
  }

  ngOnDestroy() {
    this.getCurrentUserSub.unsubscribe();
    this.searchUserByLoginSub.unsubscribe();
  }

  public createProjectsFormGroup(project?: any): FormGroup {
    const group = this.fb.group({
      project: null,
      dateStart: null,
      dateEnd: null
    });

    if (project) {
      group.patchValue(project);
    }

    return group;
  }

  public get projectFormArray(): FormArray {
    return this.profileForm.get('projects') as FormArray;
  }

  public addProjectFromGroup(): void {
    const formArray = this.projectFormArray;
    formArray.controls.push(this.createProjectsFormGroup());
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

    this.profileForm.get('hasMailing').enable();

    if (this.contextStoreService.getCurrentUser().isAdmin) {
      this.profileForm.get('subdivision').enable();
      this.profileForm.get('jobPosition').enable();
      this.profileForm.get('isAdmin').enable();
    }
    this.isEdit = true;
  }

  public onUpdateProfile(): void {
    this.employeeApiService.updateUserInfo(this.login, this.profileForm.getRawValue()).subscribe(() => {
      this.cancelEdit();
      this.contextStoreService.update();
      this.employeeStoreService.update();
      this.loadFollow();
    });
  }

  public addFollowingByForm(): void {
    const data: FollowModel = {
      followingId: this.followingForm.value,
      followerId: this.selectedUser,
      followType: 'add'
    };

    this.followApi.addFollow(data).subscribe(res => this.loadFollow());
    this.followingForm.reset();
  }

  public toggleFollow(user: Employee) {
    const isUserRemoved = this.removedFollowing.some(item => item.followingId._id === user._id);

    if (isUserRemoved) {
      const followId = this.removedFollowing.find(item => item.followingId._id === user._id)._id;
      this.deleteFollowing(followId);
    }

    if (this.isAddedUser(user)) {
      const follow = this.addedFollowing.find(item => item.followingId._id === user._id);
      this.deleteFollowing(follow._id);
    } else {
      const data: FollowModel = {
        followingId: user,
        followerId: this.selectedUser,
        followType: 'add'
      };

      this.followApi.addFollow(data).subscribe(res => this.loadFollow());
    }
  }

  public removeFollowing(user: Employee) {

    if (this.isAddedUser(user)) {
      const follow = this.addedFollowing.find(item => item.followingId._id === user._id);
      this.deleteFollowing(follow._id);
    }

    const data: FollowModel = {
      followingId: user,
      followerId: this.selectedUser,
      followType: 'remove'
    };

    this.followApi.addFollow(data).subscribe(res => this.loadFollow());
  }

  public getIRemoved(): Employee[] {
    if (this.allForMe && this.allForMe.length > 0) {
      return this.allForMe.filter(item => {
        return item.followingId._id === this.selectedUser._id;
      }).map(item => item.followerId);
    }

    return [];
  }

  public deleteFollowing(id: string) {
    this.followApi.deleteFollow(id).subscribe(res => this.loadFollow());
  }

  public cancelEdit(): void {
    this.profileForm.disable();
    this.isEdit = false;
  }

  public getAvatarSrc() {
    return `${environment.baseUrl}/avatar?login=` + this.login;
  }

  private getUserInfo(): void {
    const jobPositions$ = this.dictionaryApi.getAll('jobPosition');
    const subdivisions$ = this.dictionaryApi.getAll('subdivision');

    forkJoin([jobPositions$, subdivisions$]).subscribe(res => {
      const [jobPositions, subdivisions] = res;
      this.jobPositions = jobPositions;
      this.subdivisions = subdivisions;

      this.login = this.route.snapshot.params.id;
      if (!this.login) {
        this.getUserFromStore();
      } else {
        this.getUserFromApi();
      }

    });
  }

  private getUserFromApi() {
    this.searchUserByLoginSub.add(
      this.employeeApiService.searchUserByLogin(this.login).subscribe((user: Employee) => {
        this.initForm(user);
        this.setSelectedUser(user);
        this.canEdit = false;
        this.loadTasks(user.mailNickname);
        this.loadFollow();
        this.mailingAddresses = this.sendingMail.filterEmployee(this.selectedUser);
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
          this.loadFollow();
          this.mailingAddresses = this.sendingMail.filterEmployee(this.selectedUser);
        })
    );
  }

  public loadTasks(user: string): void {
    this.taskHistory$ = this.taskApi.loadAllTasksByAuthor(user);
    combineLatest([this.users$, this.taskHistory$])
      .pipe(filter(([users, tasks]) => !!users.length && !!tasks.length))
      .subscribe(
        ([users, tasks]) =>
          (this.activity = tasks
            .map(task => {
              const currentUser = users.find(u => u.mailNickname === task.employee);
              if (!currentUser) {
                return;
              }
              task.employee = currentUser.username ? currentUser.username : currentUser.mailNickname;
              return task;
            })
            .filter(t => !!t))
      );
  }

  public loadFollow() {
    const following$ = this.followApi.getMyFollowing(this.selectedUser._id);
    const followers$ = this.followApi.getMyFollowers(this.selectedUser._id);
    const removedFollowers$ = this.followApi.getMyRemovedFollowing(this.selectedUser._id);
    const addedFollowers$ = this.followApi.getMyAddedFollowing(this.selectedUser._id);
    const allForMe$ = this.followApi.getAllForMe(this.selectedUser._id);

    forkJoin([following$, removedFollowers$, followers$, addedFollowers$, allForMe$]).subscribe(([following, removed, followers, added, all]) => {
      this.following = following;
      this.removedFollowing = removed;
      this.followers = followers;
      this.addedFollowing = added;
      this.allForMe = all;
    });
  }

  public isAddedUser(user: Employee): boolean {
    if (this.addedFollowing.length === 0) {
      return false;
    }

    return this.addedFollowing.some(item => {
      return item.followingId._id === user._id;
    });
  }

  private initForm(user: Employee): void {
    const jobPosition = this.jobPositions.find(jp => user.jobPosition && jp._id === user.jobPosition._id);
    const subdivision = this.subdivisions.find(sd => user.subdivision && sd._id === user.subdivision._id);

    this.profileForm = this.fb.group({
      id: new FormControl(user._id),
      username: new FormControl(user.username),
      email: new FormControl(user.email),
      projects: this.fb.array(user.projects.map(project => this.createProjectsFormGroup(project))),
      location: new FormControl(user.location),
      telNumber: new FormControl(user.telNumber),
      isAdmin: new FormControl(user.isAdmin),
      hasMailing: new FormControl(user.hasMailing),
      jobPosition: new FormControl(jobPosition),
      subdivision: new FormControl(subdivision),
      whenCreated: new FormControl(user.whenCreated)
    });
    this.profileForm.disable();
  }

  private setSelectedUser(user: Employee): void {
    this.selectedUser = user;
  }
}
