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
import { filter, first, switchMap } from 'rxjs/operators';
import { DICTIONARIES } from 'src/app/admin/components/dictionary-admin/dictionaries.cont';
import { AddProjectToProfilePopupComponent } from 'src/app/admin/components/popups/add-project-to-profile-popup/add-project-to-profile-popup.component';
import { DictionaryApiService } from 'src/app/core/services/dictionary-api.service';
import { DictionaryModel } from 'src/app/shared/models/dictionary.model';
import { ProfileProjectsService } from 'src/app/shared/services/profile-projects.service';

import { ProjectNewModel } from '../../../../shared/models/project-new.model';
import { NewProjectUtils } from '../../../../shared/utils/new-project.utils';

@Component({
  selector: 'app-profile-projects-table',
  templateUrl: './profile-projects-table.component.html',
  styleUrls: ['./profile-projects-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileProjectsTableComponent implements OnChanges, OnInit {
  @Input()
  projects: ProjectNewModel[] = [];

  @Input()
  projectsMaxPeriod: moment.Moment[];

  @Input()
  isAdmin: boolean;

  @Output()
  updateValue = new EventEmitter<{ project: ProjectNewModel; date: moment.Moment; value: number }>();

  private projectDict: DictionaryModel[];

  constructor(
    private profileProjectsService: ProfileProjectsService,
    private dialog: MatDialog,
    private dictionaryApi: DictionaryApiService
  ) {}

  public ngOnInit() {
    this.initProjectsDict();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.projectsMaxPeriod.currentValue) {
      this.projectsMaxPeriod = [...this.projectsMaxPeriod].reverse();
    }
  }

  private initProjectsDict(): void {
    this.dictionaryApi.getAll('project').subscribe((value) => {
      this.projectDict = value;
    });
  }

  getProjectPercentByDate(project: ProjectNewModel, date: moment.Moment) {
    const metadata = project.metadata.find((m) => NewProjectUtils.mapMetadataToDate(m).isSame(date, 'month'));

    return metadata?.percent || 0;
  }

  onUpdateValue(project: ProjectNewModel, date: moment.Moment, value: string) {
    this.updateValue.emit({ project, date, value: +value });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectToProfilePopupComponent, {
      width: '400px',
      data: { value: this.projectDict },
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((res) => !!res)
      )
      .subscribe((res) => {
        console.log(res);
        // this.snackbar.showSuccessSnackBar('Операция выполнена успешно');
        // const currentDictionaryState = this.selectedDictionary$.value.filter(d => d._id !== res._id);
        // this.selectedDictionary$.next([...currentDictionaryState, res].sort(this.sortByName));
      });
  }

  public deleteProject(project: ProjectNewModel): void {
    this.profileProjectsService.deleteProject(project);
  }

  public deleteMonth(date: moment.Moment) {
    this.profileProjectsService.deleteMonthFromProjects(date);
  }
}
