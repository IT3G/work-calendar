import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import * as moment from 'moment';
import { filter, first, switchMap } from 'rxjs/operators';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { ContextStoreService } from 'src/app/core/store/context-store.service';
import { DictionaryModel } from 'src/app/shared/models/dictionary.model';
import { DeleteConfrimPopupComponent } from 'src/app/shared/pop-up/delete-confirm-pop-up/delete-confrim-popup.component';

import { ProjectNewModel } from '../../../../shared/models/project-new.model';
import { NewProjectUtils } from '../../../../shared/utils/new-project.utils';

@Component({
  selector: 'app-profile-projects-table',
  templateUrl: './profile-projects-table.component.html',
  styleUrls: ['./profile-projects-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileProjectsTableComponent implements OnChanges {
  @Input()
  projects: ProjectNewModel[] = [];

  @Input()
  projectsMaxPeriod: moment.Moment[];

  @Input()
  isAdmin: boolean;

  @Input()
  projectDict: DictionaryModel[];

  @Output()
  updateValue = new EventEmitter<{ project: ProjectNewModel; date: moment.Moment; value: number }>();

  constructor(
    private employeeApiService: EmployeeApiService,
    private contextStoreService: ContextStoreService,
    private dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.projectsMaxPeriod?.currentValue) {
      this.projectsMaxPeriod = [...this.projectsMaxPeriod].reverse();
    }
  }

  getProjectPercentByDate(project: ProjectNewModel, date: moment.Moment) {
    const metadata = project.metadata.find((m) => NewProjectUtils.mapMetadataToDate(m).isSame(date, 'month'));

    return metadata?.percent || 0;
  }

  onUpdateValue(project: ProjectNewModel, date: moment.Moment, value: string) {
    this.updateValue.emit({ project, date, value: +value });
  }

  public deleteProject(project: ProjectNewModel): void {
    const dialogRef = this.dialog.open(DeleteConfrimPopupComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((res) => !!res),
        switchMap(() => {
          const selectedUser = this.contextStoreService.getSelectedUserValue();

          const deletableProjectIndex = selectedUser.projectsNew.findIndex((p) => p.project_id === project.project_id);
          const filteredProjects = selectedUser.projectsNew.filter((p, index) => {
            return index !== deletableProjectIndex;
          });

          return this.employeeApiService.updateUserInfo(selectedUser.mailNickname, {
            ...selectedUser,
            projectsNew: [...filteredProjects],
          });
        })
      )
      .subscribe((user) => {
        this.contextStoreService.setSelectedUser(user);
      });
  }

  public deleteMonth(date: moment.Moment) {
    const dialogRef = this.dialog.open(DeleteConfrimPopupComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((res) => !!res),
        switchMap(() => {
          const month = date.month() + 1;
          const year = date.year();
          const selectedUser = this.contextStoreService.getSelectedUserValue();
          const filteredProjects = selectedUser.projectsNew
            .map((p) => {
              const newMetadata = p.metadata.filter((metadata) => {
                return !(metadata.month === month && metadata.year === year);
              });
              return { ...p, metadata: newMetadata };
            })
            .filter((p) => (p.metadata.length ? true : false));

          return this.employeeApiService.updateUserInfo(selectedUser.mailNickname, {
            ...selectedUser,
            projectsNew: [...filteredProjects],
          });
        })
      )
      .subscribe((user) => {
        this.contextStoreService.setSelectedUser(user);
      });
  }
}
