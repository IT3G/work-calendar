import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { AddPopupComponent } from '../popups/add-popup/add-popup.component';

@Component({
  selector: 'app-subdivision-adm',
  templateUrl: './subdivision-adm.component.html',
  styleUrls: ['./subdivision-adm.component.scss']
})
export class SubdivisionAdmComponent implements OnInit {
  public subdivisions$: BehaviorSubject<DictionaryModel[]> = new BehaviorSubject([]);
  public displayedColumns: string[] = ['title'];

  constructor(
    private snackbar: SnackbarService,
    private dictionaryApi: DictionaryApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dictionaryApi.getAll('subdivision').subscribe((res) => this.subdivisions$.next(res));
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
        filter((res) => !!res),
        switchMap((res) => this.dictionaryApi.add('subdivision', { name: res }))
      )
      .subscribe((res) => {
        this.snackbar.showSuccessSnackBar('Подразделение успешно добавлен');
        this.subdivisions$.next([...this.subdivisions$.value, res]);
      });
  }
}
