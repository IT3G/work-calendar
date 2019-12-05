import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { AddPopupComponent } from '../popups/add-popup/add-popup.component';

@Component({
  selector: 'app-job-position-administration',
  templateUrl: './job-position-administration.component.html',
  styleUrls: ['./job-position-administration.component.scss']
})
export class JobPositionAdministrationComponent implements OnInit {
  public jobPositions$: BehaviorSubject<DictionaryModel[]> = new BehaviorSubject([]);
  public displayedColumns: string[] = ['name', 'delete'];
  public title: string;

  constructor(
    private dictionaryApi: DictionaryApiService,
    private snackbar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dictionaryApi.getAll('jobPosition').subscribe(res => this.jobPositions$.next(res));
  }

  public trackByFn(index: number, item: DictionaryModel) {
    return `${item._id}_${item.name}`;
  }

  public delete(item: DictionaryModel) {
    this.dictionaryApi.delete('jobPosition', item._id).subscribe(() => {
      this.jobPositions$.next(this.jobPositions$.value.filter(i => i._id !== item._id));
      this.snackbar.showSuccessSnackBar('Позиция успешно удалена');
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '400px',
      data: { title: 'Добавьте новую позицию' }
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter(res => !!res),
        switchMap(res => this.dictionaryApi.add('jobPosition', { name: res }))
      )
      .subscribe(res => {
        this.snackbar.showSuccessSnackBar('Позиция успешно добавлена');
        this.jobPositions$.next([...this.jobPositions$.value, res]);
      });
  }
}
