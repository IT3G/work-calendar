import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { InputFile } from 'ngx-input-file';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { SkillsApiService } from 'src/app/core/services/skills-api.service';
import { Employee } from 'src/app/shared/models/employee.model';
import { SkillsModel } from 'src/app/shared/models/skills.model';
import { environment } from 'src/environments/environment';

import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-profile-skills',
  templateUrl: './profile-skills.component.html',
  styleUrls: ['./profile-skills.component.scss'],
})
export class ProfileSkillsComponent implements OnInit {
  public profileSkillsDisplayedColumns: string[] = ['icon', 'name', 'delete'];

  public allSkillsDisplayedColumns: string[] = ['icon', 'name', 'add'];

  public skills$: Observable<SkillsModel[]>;

  @Input()
  public currentUser: Employee;

  @Input()
  public selectedUser: Employee;

  @Output()
  updateSelectedUser = new EventEmitter<Employee>();

  @Input()
  isAdmin: boolean;

  public baseUrl = environment.baseUrl;

  constructor(
    private employeeApiService: EmployeeApiService,
    private skillsApi: SkillsApiService,
    private snackbar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initSkills();
  }

  private initSkills() {
    const userSkillsId = this.selectedUser.skills.map((skill) => {
      return skill._id;
    });
    this.skills$ = this.skillsApi.getAll().pipe(
      map((skills) => {
        return skills.filter((skill) => {
          return !userSkillsId.includes(skill._id);
        });
      })
    );
  }

  public trackByFn(index: number, item: DictionaryModel) {
    return `${item._id}_${item.name}`;
  }

  public deleteSkill(skill: SkillsModel): void {
    const newSkills = this.selectedUser.skills.filter((res) => {
      return res._id !== skill._id;
    });
    this.employeeApiService
      .updateUserInfo(this.selectedUser.mailNickname, <Employee>{ skills: newSkills })
      .subscribe((user) => {
        this.updateSelectedUser.emit(user);
        this.selectedUser = user;
        this.initSkills();
      });
  }

  public addSkill(skill: SkillsModel): void {
    this.employeeApiService
      .updateUserInfo(this.selectedUser.mailNickname, <Employee>{ skills: [...this.selectedUser.skills, skill] })
      .subscribe((user) => {
        this.updateSelectedUser.emit(user);
        this.selectedUser = user;
        this.initSkills();
      });
  }

  public userCanEdit(): boolean {
    return this.currentUser.mailNickname === this.selectedUser.mailNickname || this.isAdmin;
  }
}
