import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { Employee } from '../../../shared/models/employee.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnChanges {
  @Input()
  selectedUser: Employee;

  @Input()
  isAdmin: boolean;

  @Input()
  canEdit: boolean;

  @Output()
  updateProfile = new EventEmitter<Employee>();

  public profileForm: FormGroup;
  public jobPositions: DictionaryModel[];
  public subdivisions: DictionaryModel[];
  public isEdit = false;

  constructor(private fb: FormBuilder, private dictionaryApi: DictionaryApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedUser && changes.selectedUser.currentValue) {
      this.initForm(this.selectedUser);
      this.getUserInfo();
    }
  }

  public editStart(): void {
    this.profileForm.get('location').enable();
    this.profileForm.get('telNumber').enable();
    this.profileForm.get('skype').enable();
    this.profileForm.get('telegram').enable();
    this.profileForm.get('hasMailing').enable();

    if (this.isAdmin) {
      this.profileForm.get('whenCreated').enable();
      this.profileForm.get('username').enable();
      this.profileForm.get('birthday').enable();
      this.profileForm.get('remoteWork').enable();
      this.profileForm.get('subdivision').enable();
      this.profileForm.get('jobPosition').enable();
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
      whenCreated: [user.whenCreated],
      terminationDate: [user.terminationDate],
      birthday: [user.birthday],
      remoteWork: [user.remoteWork],
    });
    this.profileForm.disable();
  }

  private getUserInfo(): void {
    const jobPositions$ = this.dictionaryApi.getAll('jobPosition');
    const subdivisions$ = this.dictionaryApi.getAll('subdivision');

    forkJoin([jobPositions$, subdivisions$]).subscribe((res) => {
      const [jobPositions, subdivisions] = res;
      this.jobPositions = jobPositions;
      this.subdivisions = subdivisions;

      if (!this.profileForm) {
        return;
      }

      const jobPosition = this.jobPositions.find(
        (jp) => this.selectedUser.jobPosition && jp._id === this.selectedUser.jobPosition._id
      );
      const subdivision = this.subdivisions.find(
        (sd) => this.selectedUser.subdivision && sd._id === this.selectedUser.subdivision._id
      );

      this.profileForm.patchValue({ jobPosition, subdivision });
    });
  }
}
