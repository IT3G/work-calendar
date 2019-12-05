import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { AddPopupComponent } from '../popups/add-popup/add-popup.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects$: BehaviorSubject<DictionaryModel[]> = new BehaviorSubject([]);
  public displayedColumns: string[] = ['title'];

  constructor(
    private snackbar: SnackbarService,
    private dictionaryApi: DictionaryApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dictionaryApi.getAll('project').subscribe(res => this.projects$.next(res));
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '400px',
      data: { title: 'Введите название проекта' }
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter(res => !!res),
        switchMap(res => this.dictionaryApi.add('project', { name: res }))
      )
      .subscribe(res => {
        this.snackbar.showSuccessSnackBar('Проект успешно добавлен');
        this.projects$.next([...this.projects$.value, res]);
      });
  }
}
