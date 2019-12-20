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
  public holidays$: BehaviorSubject<HolidaysModel> = new BehaviorSubject({data: []});
  public filterYear: string;

  public fileType = '.csv';
  public buttonText = 'Загрузить файл';
  public fileControl: FormControl;
  public filterControl: FormControl;

  public isLoading: Boolean = true;

  constructor(private holidaysService: HolidaysApiService) {
  }

  ngOnInit() {
    this.fileControl = new FormControl();
    this.filterControl = new FormControl();
    this.filterYear = new Date().getFullYear().toString();

    this.holidaysService.getAllHolidays()
      .subscribe(res => {
        if (res.data && res.data.length > 0) {
          // const result = res.data.sort((a, b) => {
          //   return Number(a.year) - Number(b.year);
          // });
          this.holidays$.next(res);
        }

      }).add(() => this.isLoading = false);

    this.fileControl.valueChanges.subscribe(res => {
      if (res) {
        Papa.parse(res, {
          header: true,
          skipEmptyLines: true,
          complete: (result, file) => {

            const _id = this.holidays$.value._id;

            this.holidaysService.upsertHolidays({data: this.mapper(result, file), _id, }).subscribe();
            this.holidays$.next({data: this.mapper(result, file), _id, });
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
      return {
        year: item[HolidaysRawData.yearMonth],
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
        Dec: item[HolidaysRawData.Dec],
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
