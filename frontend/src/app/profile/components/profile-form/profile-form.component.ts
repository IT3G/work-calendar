import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommunicationTypesEnum } from 'src/app/shared/enums/communication-types.enum';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { Employee } from '../../../shared/models/employee.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnChanges, OnDestroy {
  @Input()
  selectedUser: Employee;

  @Input()
  isAdmin: boolean;

  @Input()
  canEdit: boolean;

  @Output()
  updateProfile = new EventEmitter<Employee>();

  public communicationTypesEnum = CommunicationTypesEnum;

  public birthdayWithHideYear: string;

  public profileForm: FormGroup;
  public jobPositions: DictionaryModel[];
  public subdivisions: DictionaryModel[];
  public projectOffices: DictionaryModel[];
  public isEdit = false;

  private unsubscriber$ = new Subject();

  constructor(private fb: FormBuilder, private dictionaryApi: DictionaryApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedUser && changes.selectedUser.currentValue) {
      this.initForm(this.selectedUser);
      this.getUserInfo();

      this.birthdayWithHideYearSetter();

      this.subscribeToHideYearControl();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  private birthdayWithHideYearSetter(): void {
    if (this.selectedUser.birthdayHideYear) {
      this.birthdayWithHideYear = this.formatFieldToDayAndMonth(this.selectedUser.birthday);
    }
  }

  /** динамически менять значение года при выбранном чекбоксе */
  private subscribeToHideYearControl(): void {
    this.profileForm.controls.birthdayHideYear.valueChanges.pipe(takeUntil(this.unsubscriber$)).subscribe((value) => {
      if (value) {
        this.birthdayWithHideYear = this.formatFieldToDayAndMonth(this.selectedUser.birthday);
        return;
      }
      this.birthdayWithHideYear = null;
    });
  }

  private formatFieldToDayAndMonth(date: string): string {
    return moment(date).format('DD.MM');
  }

  public editStart(): void {
    this.profileForm.get('location').enable();
    this.profileForm.get('telNumber').enable();
    this.profileForm.get('skype').enable();
    this.profileForm.get('telegram').enable();
    this.profileForm.get('hasMailing').enable();
    this.profileForm.get('mattermost').enable();
    this.profileForm.get('birthdayHideYear').enable();

    if (this.isAdmin) {
      this.profileForm.get('whenCreated').enable();
      this.profileForm.get('username').enable();
      this.profileForm.get('birthday').enable();
      this.profileForm.get('remoteWork').enable();
      this.profileForm.get('subdivision').enable();
      this.profileForm.get('jobPosition').enable();
      this.profileForm.get('projectOffice').enable();
      this.profileForm.get('isAdmin').enable();
      this.profileForm.get('terminationDate').enable();
    }
    this.isEdit = true;
  }

  public cancelEdit(): void {
    this.profileForm.disable();
    this.isEdit = false;
  }

  public onUpdateProfile() {
    this.updateProfile.emit(this.profileForm.getRawValue());
    this.cancelEdit();
  }

  public linkToCommunication(type: CommunicationTypesEnum): void {
    if (this.isEdit) {
      return;
    }
    let url = '';

    switch (type) {
      case 'telegram':
        url = `https://t.me/${this.selectedUser.telegram}`;
        break;
      case 'skype':
        url = `skype:/${this.selectedUser.telegram}`;
        break;
      case 'telephone':
        url = `tel:${this.selectedUser.telNumber}`;
        break;
      case 'mail':
        url = `mailto:${this.selectedUser.telNumber}`;
        break;
      case 'mattermost':
        url = `https://mattermost.it2g.ru/zeroline/messages//${this.selectedUser.mattermost}`;
        break;
    }

    window.open(url);
  }

  private initForm(user: Employee): void {
    this.profileForm = this.fb.group({
      id: [user._id],
      username: [user.username],
      email: [user.email],
      location: [user.location],
      telNumber: [user.telNumber],
      skype: [user.skype],
      telegram: [user.telegram],
      isAdmin: [user.isAdmin],
      hasMailing: [user.hasMailing],
      jobPosition: [null],
      subdivision: [null],
      projectOffice: [null],
      whenCreated: [user.whenCreated],
      terminationDate: [user.terminationDate],
      birthday: [user.birthday],
      remoteWork: [user.remoteWork],
      mattermost: [user.mattermost],
      birthdayHideYear: [user.birthdayHideYear],
    });
    this.profileForm.disable();
  }

  private getUserInfo(): void {
    const jobPositions$ = this.dictionaryApi.getAll('jobPosition');
    const subdivisions$ = this.dictionaryApi.getAll('subdivision');
    const projectOffices$ = this.dictionaryApi.getAll('projectOffice');

    forkJoin([jobPositions$, subdivisions$, projectOffices$]).subscribe((res) => {
      const [jobPositions, subdivisions, projectOffices] = res;
      this.jobPositions = jobPositions;
      this.subdivisions = subdivisions;
      this.projectOffices = projectOffices;

      if (!this.profileForm) {
        return;
      }

      const jobPosition = this.jobPositions.find(
        (jp) => this.selectedUser.jobPosition && jp._id === this.selectedUser.jobPosition._id
      );
      const subdivision = this.subdivisions.find(
        (sd) => this.selectedUser.subdivision && sd._id === this.selectedUser.subdivision._id
      );
      const projectOffice = this.projectOffices.find(
        (po) => this.selectedUser.projectOffice && po._id === this.selectedUser.projectOffice._id
      );

      this.profileForm.patchValue({ jobPosition, subdivision, projectOffice });
    });
  }
}
