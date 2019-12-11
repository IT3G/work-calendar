import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { BehaviorSubject } from 'rxjs';
import { AddHolidaysComponent } from '../popups/add-holidays/add-holidays.component';
import { mockYears } from './mock-data';

import * as Papa from 'papaparse';



interface HolidaysData {
  Jan:  'Январь';
  Feb:  'Февраль';
  Mar:  'Март';
  Apr:  'Апрель';
  May:  'Май';
  June:  'Июнь';
  July:  'Июль';
  Aug:  'Август';
  Sept:  'Сентябрь';
  Oct:  'Октябрь';
  Nov:  'Ноябрь';
  Dec:  'Декабрь';
  all: 'Всего праздничных и выходных дней';
  allWork: 'Всего рабочих дней';
  yearMonth: 'Год/Месяц';
  hours24: 'Количество рабочих часов при 24-часовой рабочей неделе';
  hours36: 'Количество рабочих часов при 36-часовой рабочей неделе';
  hours40: 'Количество рабочих часов при 40-часовой рабочей неделе';
}

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  public holidays$: BehaviorSubject<number[]> = new BehaviorSubject(mockYears);
  public displayedColumns: string[] = ['year'];

  constructor(
    private snackbar: SnackbarService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddHolidaysComponent, {
      width: '400px',
      data: { title: 'Введите название проекта' }
    });

    dialogRef
      .afterClosed()
      .subscribe(res => {

        Papa.parse(res.file, {
          header: true,
          skipEmptyLines: true,
          complete: (result, file) => {


          }
        });
        // this.snackbar.showSuccessSnackBar('Проект успешно добавлен');
        // this.projects$.next([...this.projects$.value, res]);
      });
  }

  private mapper() {

  }
}
