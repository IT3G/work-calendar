import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
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
  public jobPositions$: Observable<JobPositionModel[]>;
  public displayedColumns: string[] = ['name'];
  public title: string;

  constructor(
    private jobPositionApi: JobPositionApiService,
    private snackbar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.jobPositions$ = this.jobPositionApi.getAll();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '400px',
      data: { title: 'Добавьте новую должность' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.jobPositionApi.addPosition({ name: result }).subscribe(() => {
        this.snackbar.showSuccessSnackBar('Должность успешно добавлена');
        this.jobPositions$ = this.jobPositionApi.getAll();
      });
    });
  }
}
