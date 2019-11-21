import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { JobPositionApiService } from '../../../core/services/job-position-api.service';
import { JobPositionModel } from '../../../shared/models/job-position.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { AddPopupComponent } from '../popups/add-popup/add-popup.component';

@Component({
  selector: 'app-job-position-administration',
  templateUrl: './job-position-administration.component.html',
  styleUrls: ['./job-position-administration.component.scss']
})
export class JobPositionAdministrationComponent implements OnInit {
  public jobPositions$: BehaviorSubject<JobPositionModel[]> = new BehaviorSubject([]);
  public displayedColumns: string[] = ['name', 'delete'];
  public title: string;

  constructor(
    private jobPositionApi: JobPositionApiService,
    private snackbar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.jobPositionApi.getAll().subscribe(res => this.jobPositions$.next(res));
  }

  public trackByFn(index: number, item: JobPositionModel) {
    return `${item._id}_${item.name}`;
  }

  public delete(item: JobPositionModel) {
    this.jobPositionApi.deletePosition(item._id).subscribe(() => {
      this.jobPositions$.next(this.jobPositions$.value.filter(i => i._id !== item._id));
      this.snackbar.showSuccessSnackBar('Должность успешно удалена');
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '400px',
      data: { title: 'Добавьте новую должность' }
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter(res => !!res),
        switchMap(res => this.jobPositionApi.addPosition({ name: res }))
      )
      .subscribe(res => {
        this.snackbar.showSuccessSnackBar('Должность успешно добавлена');
        this.jobPositions$.next([...this.jobPositions$.value, res]);
      });
  }
}
