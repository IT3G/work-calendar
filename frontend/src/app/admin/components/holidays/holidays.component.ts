import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';
import { FormControl } from '@angular/forms';
import { HolidaysApiService } from '../../../core/services/holidays-api.service';
import { HolidaysModel, HolidaysRawData, HolidaysYearModel } from '../../../shared/models/holidays.model';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  public holidays$: BehaviorSubject<HolidaysModel> = new BehaviorSubject(null);
  public filterYear: string;

  public fileType = '.csv';
  public buttonText = 'Загрузить файл';
  public fileControl: FormControl;

  public isLoading: Boolean = true;

  constructor(private holidaysService: HolidaysApiService) {
  }

  ngOnInit() {
    this.fileControl = new FormControl();
    this.filterYear = new Date().getFullYear().toString();

    this.holidaysService
      .getAllHolidays()
      .subscribe(res => {
        this.holidays$.next(res[0]);
      })
      .add(() => (this.isLoading = false));

    this.fileControl.valueChanges.subscribe(res => {
      if (res) {
        Papa.parse(res, {
          header: true,
          skipEmptyLines: true,
          complete: (result, file) => {
            const currentID = this.holidays$.value && this.holidays$.value._id;
            if (currentID) {
              this.holidaysService.updateHolidays({ data: this.mapper(result, file), _id: currentID });
              this.holidays$.next({ data: this.mapper(result, file), _id: currentID });
            } else {
              this.holidaysService.addHolidays({ data: this.mapper(result, file) }).subscribe();
              this.holidays$.next({ data: this.mapper(result, file) });
            }
          }
        });
      }
    });
  }

  public getDate(year: string, month: number) {
    return {
      year,
      month
    };
  }

  public setFilter(year: string) {
    this.filterYear = year;
  }

  private mapper(src: ParseResult, file: File): HolidaysYearModel[] {

    return src.data.map(item => {
      const year = item[HolidaysRawData.yearMonth];
      const Jan = item[HolidaysRawData.Jan].toString().replace(/\+/g, '');
      const Feb = item[HolidaysRawData.Feb].toString().replace(/\+/g, '');
      const Mar = item[HolidaysRawData.Mar].toString().replace(/\+/g, '');
      const Apr = item[HolidaysRawData.Apr].toString().replace(/\+/g, '');
      const May = item[HolidaysRawData.May].toString().replace(/\+/g, '');
      const June = item[HolidaysRawData.June].toString().replace(/\+/g, '');
      const July = item[HolidaysRawData.July].toString().replace(/\+/g, '');
      const Aug = item[HolidaysRawData.Aug].toString().replace(/\+/g, '');
      const Sept = item[HolidaysRawData.Sept].toString().replace(/\+/g, '');
      const Oct = item[HolidaysRawData.Oct].toString().replace(/\+/g, '');
      const Nov = item[HolidaysRawData.Nov].toString().replace(/\+/g, '');
      const Dec = item[HolidaysRawData.Dec].toString().replace(/\+/g, '');
      const allDays = item[HolidaysRawData.allDays];
      const allWork = item[HolidaysRawData.allWork];
      const hours24 = item[HolidaysRawData.hours24];
      const hours36 = item[HolidaysRawData.hours36];
      const hours40 = item[HolidaysRawData.hours40];
      const fileName = file.name;

      return {
        year,
        Jan,
        Feb,
        Mar,
        Apr,
        May,
        June,
        July,
        Aug,
        Sept,
        Oct,
        Nov,
        Dec,
        allDays,
        allWork,
        hours24,
        hours36,
        hours40,
        fileName
      };
    });
  }
}
