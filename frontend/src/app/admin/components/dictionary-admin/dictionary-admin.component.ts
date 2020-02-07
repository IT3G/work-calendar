import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, first, switchMap, tap } from 'rxjs/operators';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { AddPopupComponent } from '../popups/add-popup/add-popup.component';
import { DICTIONARIES } from './dictionaries.cont';

@Component({
  selector: 'app-dictionary-admin',
  templateUrl: './dictionary-admin.component.html',
  styleUrls: ['./dictionary-admin.component.scss']
})
export class DictionaryAdminComponent implements OnInit, OnDestroy {
  public readonly dictionariesList = DICTIONARIES;
  public dictionaryControl = new FormControl();
  public selectedDictionary$: BehaviorSubject<DictionaryModel[]> = new BehaviorSubject([]);
  public displayedColumns: string[] = ['name', 'edit', 'delete'];

  private subscription = new Subscription();

  constructor(
    private dictionaryApi: DictionaryApiService,
    private snackbar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.dictionaryControl.valueChanges
        .pipe(
          tap(res => {
            if (!res) {
              this.selectedDictionary$.next([]);
            }
          }),
          filter(res => !!res),
          switchMap(res => this.dictionaryApi.getAll(res))
        )
        .subscribe(res => this.selectedDictionary$.next(res.sort(this.sortByName)))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public trackByFn(index: number, item: DictionaryModel) {
    return `${item._id}_${item.name}`;
  }

  public delete(item: DictionaryModel) {
    this.dictionaryApi.delete(this.dictionaryControl.value, item._id).subscribe(() => {
      this.selectedDictionary$.next(this.selectedDictionary$.value.filter(i => i._id !== item._id));
      this.snackbar.showSuccessSnackBar('Позиция успешно удалена');
    });
  }

  public openDialog(value?: DictionaryModel): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '400px',
      data: { value }
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter(res => !!res),
        switchMap((res: DictionaryModel) => {
          if (res._id) {
            return this.dictionaryApi.update(this.dictionaryControl.value, res);
          }
          return this.dictionaryApi.add(this.dictionaryControl.value, res);
        })
      )
      .subscribe(res => {
        this.snackbar.showSuccessSnackBar('Операция выполнена успешно');
        const currentDictionaryState = this.selectedDictionary$.value.filter(d => d._id !== res._id);
        this.selectedDictionary$.next([...currentDictionaryState, res].sort(this.sortByName));
      });
  }

  private sortByName(a: DictionaryModel, b: DictionaryModel) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  }
}
