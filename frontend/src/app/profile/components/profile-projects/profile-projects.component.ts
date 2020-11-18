import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import * as moment from 'moment';
import { filter, first } from 'rxjs/operators';
import { DictionaryApiService } from 'src/app/core/services/dictionary-api.service';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { ContextStoreService } from 'src/app/core/store/context-store.service';
import { DictionaryModel } from 'src/app/shared/models/dictionary.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { ProjectNewModel } from '../../../shared/models/project-new.model';
import { NewProjectUtils } from '../../../shared/utils/new-project.utils';
import { AddDateToProjectProfilePopupComponent } from '../pop-up/add-month-to-profile-project-popup/add-month-to-profile-project-popup.component';
import { AddProjectToProfilePopupComponent } from '../pop-up/add-project-to-profile-popup/add-project-to-profile-popup.component';

export interface DateInterface {
  projectMonth: number;
  projectYear: number;
}

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileProjectsComponent implements OnInit, OnChanges {
  @Input()
  projects: ProjectNewModel[] = [];

  @Input()
  isAdmin: boolean;

  @Output()
  updateValue = new EventEmitter<{ project: ProjectNewModel; date: moment.Moment; value: number }>();

  public projectsMaxPeriod: moment.Moment[];

  public projectDict: DictionaryModel[];

  constructor(
    private contextStoreService: ContextStoreService,
    private employeeApiService: EmployeeApiService,
    private dialog: MatDialog,
    private dictionaryApi: DictionaryApiService,
    private snackbar: SnackbarService
  ) {}

  public ngOnInit(): void {
    this.initProjectsDict();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.projects?.currentValue?.length) {
      this.projectsMaxPeriod = this.getProjectsMaxPeriod(changes.projects.currentValue);
    }
  }

  public addProjectDialog(): void {
    const dialogRef = this.dialog.open(AddProjectToProfilePopupComponent, {
      width: '400px',
      data: { value: this.filterProjectsToChoose(this.projectDict) },
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((res) => !!res)
      )
      .subscribe((res: DictionaryModel) => {
        this.addProject(res);
        this.snackbar.showSuccessSnackBar('Проект добавлен успешно');
      });
  }

  public addDateDialog(): void {
    const dialogRef = this.dialog.open(AddDateToProjectProfilePopupComponent, {
      width: '400px',
      data: { value: this.convertProjectMaxPeriodToMonthAndYear() },
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((res) => !!res)
      )
      .subscribe((res: DateInterface) => {
        const newDate = moment(`${res.projectMonth}-${res.projectYear}`, 'M-YYYY');
        this.updateValue.emit({ project: this.projects[0], date: newDate, value: 0 });
        this.snackbar.showSuccessSnackBar('Месяц добавлен успешно');
      });
  }

  private convertProjectMaxPeriodToMonthAndYear(): DateInterface[] {
    return [...this.projectsMaxPeriod].map((projectPeriod) => {
      return { projectMonth: projectPeriod.month(), projectYear: projectPeriod.year() };
    });
  }

  private initProjectsDict(): void {
    this.dictionaryApi.getAll('project').subscribe((value) => {
      this.projectDict = value;
    });
  }

  private addProject(project: DictionaryModel) {
    const selectedUser = this.contextStoreService.getSelectedUserValue();

    selectedUser.projectsNew.push({ project_id: project._id, project_name: project.name, metadata: [] });

    this.employeeApiService
      .updateUserInfo(selectedUser.mailNickname, { ...selectedUser })
      .pipe(first())
      .subscribe((user) => {
        this.contextStoreService.setSelectedUser(user);
      });
  }

  /** отфильтровать проекты для выбора при имеющихся */
  private filterProjectsToChoose(selectableProjects: DictionaryModel[]): DictionaryModel[] {
    const currentProjectsIds = this.projects.map((project) => project.project_id);
    return selectableProjects.filter((project) => {
      return !currentProjectsIds.includes(project._id);
    });
  }

  private getProjectsMaxPeriod(projects: ProjectNewModel[] = []): moment.Moment[] {
    const appProjectsMetadata = projects
      .reduce((acc, i) => [...acc, ...i.metadata], [])
      .map((m) => NewProjectUtils.mapMetadataToDate(m))
      .sort((a, b) => (a.isBefore(b) ? -1 : 1));

    if (!appProjectsMetadata || !appProjectsMetadata.length) {
      return [];
    }

    const firstMetadata = appProjectsMetadata[0];
    const lastMetadata = appProjectsMetadata[appProjectsMetadata.length - 1];
    const additionalMonths = 1;
    const monthsPeriod = lastMetadata.diff(firstMetadata, 'months') + additionalMonths;

    return Array.from(Array(monthsPeriod).keys()).map((i) => firstMetadata.clone().add(i, 'month'));
  }
}
