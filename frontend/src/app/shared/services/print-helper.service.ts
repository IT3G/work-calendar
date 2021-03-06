import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ContextStoreService } from '../../core/store/context-store.service';
import { HttpClient } from '@angular/common/http';
import { PrintInfo } from './print-info';

@Injectable({
  providedIn: 'root'
})
export class PrintHelperService {
  constructor(private contextStoreService: ContextStoreService, private http: HttpClient) {}

  public printStatement(printInfo: PrintInfo, dateStart: string, dateEnd: string) {
    this.http.get('assets/html/print-vacation.html', { responseType: 'text' }).subscribe((html: string) => {
      const content = this.formatHtml(html, printInfo, dateStart, dateEnd);
      const popupWin = window.open('', 'self');
      popupWin.document.open();
      popupWin.document.write(
        '<html><body onafterprint="window.close()" onload="window.print()">' + content + '</html>'
      );
      popupWin.document.close();
    });
  }

  private formatHtml(html: string, printInfo: PrintInfo, dateStart: string, dateEnd: string): string {
    const blocks = html.split('***');

    const settings = this.contextStoreService.settings$.value;
    const companyName = settings.PRINT_COMPANY_NAME;
    const mainManager = settings.PRINT_HEAD_MANAGER_NAME;
    const position = settings.PRINT_HEAD_MANAGER_POSITION;
    /** dates calc */
    const dateStartMoment = moment(dateStart);
    const dateEndMoment = dateEnd ? moment(dateEnd) : null;

    const dayAndMonthStart = dateStartMoment.format('D MMMM').split(' ');
    const dayAndMonthEnd = dateEnd ? dateEndMoment.format('D MMMM').split(' ') : null;

    const daysCount = dateEnd ? `${dateEndMoment.diff(dateStart, 'days') + 1}` : '__';

    const dayNow = moment()
      .format('D MMMM YYYY')
      .split(' ');

    const fullNameFrom = `${printInfo.surnameFrom} ${printInfo.nameFrom} ${printInfo.patronymicFrom}`;
    const headersHtml = this.createHeaderHtml(blocks, companyName, position, mainManager, fullNameFrom);

    const { dateStartHtml, dateEndHtml, daysCountHtml } = this.createDatesHtml(
      blocks,
      dayAndMonthStart,
      dateStartMoment,
      dayAndMonthEnd,
      dateEnd,
      dateEndMoment,
      daysCount
    );

    const fullName = `${printInfo.surname} ${printInfo.name} ${printInfo.patronymic}`;
    const footerHtml = `${dayNow[0]}${blocks[12]}${dayNow[1]}${blocks[13]}${dayNow[2]}${blocks[14]}${fullName}${blocks[15]}`;

    return `${headersHtml}${dateStartHtml}${dateEndHtml}${daysCountHtml}${footerHtml}`;
  }

  private createDatesHtml(
    blocks: string[],
    dayAndMonthStart: string[],
    dateStartMoment: Moment,
    dayAndMonthEnd: string[],
    dateEnd: string,
    dateEndMoment: Moment,
    daysCount: string
  ) {
    const dateStartHtml = `${blocks[4]}${dayAndMonthStart[0]}${blocks[5]}${dayAndMonthStart[1]}${
      blocks[6]
    }${dateStartMoment.format('YYYY')}${blocks[7]}`;
    const dateEndHtml = `${dayAndMonthEnd ? dayAndMonthEnd[0] : ''}${blocks[8]}${
      dayAndMonthEnd ? dayAndMonthEnd[1] : ''
    }${blocks[9]}${dateEnd ? dateEndMoment.format('YYYY') : ''}${blocks[10]}`;
    const daysCountHtml = `${daysCount}${blocks[11]}`;
    return { dateStartHtml, dateEndHtml, daysCountHtml };
  }

  private createHeaderHtml(
    blocks: string[],
    companyName: string,
    position: string,
    mainManager: string,
    formatEmployee
  ): string {
    return `${blocks[0]}${companyName}${blocks[1]}${position}${blocks[2]}${mainManager}${blocks[3]}${formatEmployee}`;
  }
}
