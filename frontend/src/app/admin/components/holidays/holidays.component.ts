import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';
import { FormControl } from '@angular/forms';
import { HolidaysApiService } from '../../../core/services/holidays-api.service';
import { HolidaysSendModel } from '../../../shared/models/holidays.model';

interface HolidaysModel {
  year: string;
  months: {
    Jan: string;
    Feb: string;
    Mar: string;
    Apr: string;
    May: string;
    June: string;
    July: string;
    Aug: string;
    Sept: string;
    Oct: string;
    Nov: string;
    Dec: string;
  };
  allDays: string;
  allWork: string;
  hours24: string;
  hours36: string;
  hours40: string;
  fileName: string;
}

export enum HolidaysRawData {
  Jan = 'Январь',
  Feb = 'Февраль',
  Mar = 'Март',
  Apr = 'Апрель',
  May = 'Май',
  June = 'Июнь',
  July = 'Июль',
  Aug = 'Август',
  Sept = 'Сентябрь',
  Oct = 'Октябрь',
  Nov = 'Ноябрь',
  Dec = 'Декабрь',
  allDays = 'Всего праздничных и выходных дней',
  allWork = 'Всего рабочих дней',
  yearMonth = 'Год/Месяц',
  hours24 = 'Количество рабочих часов при 24-часовой рабочей неделе',
  hours36 = 'Количество рабочих часов при 36-часовой рабочей неделе',
  hours40 = 'Количество рабочих часов при 40-часовой рабочей неделе',
}

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  public holidays$: BehaviorSubject<HolidaysModel[]> = new BehaviorSubject([]);

  public fileType = '.csv';
  public buttonText = 'Загрузить файл';
  public fileControl: FormControl;

  constructor(private holidaysService: HolidaysApiService) {
  }

  ngOnInit() {
    this.fileControl = new FormControl();

    this.holidaysService.loadHolidays().subscribe(res => {
      // this.holidays$.next(res);
    });

    this.fileControl.valueChanges.subscribe(res => {
      if (res) {
        this.getData(res);
      } else {
        this.holidays$.next([]);
      }
    });
  }

  public sendToDB() {
    const testYear = { year: '2919', data: 'data-data' };
    this.holidaysService.addHolidays(testYear).subscribe();
  }

  private getData(data) {
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      complete: (result, file) => {
        this.holidays$.next(this.mapper(result, file));
      }
    });
  }

  public getDate(year: string, month: number) {
    return {
      year,
      month
    };
  }


  private mapper(data: ParseResult, file: File): HolidaysModel[] {

    return data.data.map(item => {
      const monthMapped = {
        Jan: item[HolidaysRawData.Jan],
        Feb: item[HolidaysRawData.Feb],
        Mar: item[HolidaysRawData.Mar],
        Apr: item[HolidaysRawData.Apr],
        May: item[HolidaysRawData.May],
        June: item[HolidaysRawData.June],
        July: item[HolidaysRawData.July],
        Aug: item[HolidaysRawData.Aug],
        Sept: item[HolidaysRawData.Sept],
        Oct: item[HolidaysRawData.Oct],
        Nov: item[HolidaysRawData.Nov],
        Dec: item[HolidaysRawData.Dec]
      };

      return {
        year: item[HolidaysRawData.yearMonth],
        months: monthMapped,
        allDays: item[HolidaysRawData.allDays],
        allWork: item[HolidaysRawData.allWork],
        hours24: item[HolidaysRawData.hours24],
        hours36: item[HolidaysRawData.hours36],
        hours40: item[HolidaysRawData.hours40],
        fileName: file.name
      };
    });
  }
}
