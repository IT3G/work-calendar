import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { SubdivisionModel } from '../../../shared/models/subdivisions.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { AddPopupComponent } from '../popups/add-popup/add-popup.component';
import { SubdivisionApiService } from '../../../core/services/subdivision-api.service';

@Component({
  selector: 'app-subdivision-adm',
  templateUrl: './subdivision-adm.component.html',
  styleUrls: ['./subdivision-adm.component.scss']
})
export class SubdivisionAdmComponent implements OnInit {
  public subdivisions$: BehaviorSubject<SubdivisionModel[]> = new BehaviorSubject([]);
  public displayedColumns: string[] = ['title'];

  constructor(private snackbar: SnackbarService, private subdivisionApi: SubdivisionApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.subdivisionApi.getSubdivisions().subscribe(res => this.subdivisions$.next(res));
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '400px',
      data: { title: 'Введите название подразделения' }
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter(res => !!res),
        switchMap(res => this.subdivisionApi.addSubdivision({ name: res }))
      )
      .subscribe(res => {
        this.snackbar.showSuccessSnackBar('Подразделение успешно добавлен');
        this.subdivisions$.next([...this.subdivisions$.value, res]);
      });
  }

}
