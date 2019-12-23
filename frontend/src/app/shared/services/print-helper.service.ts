import { Injectable } from '@angular/core';
import { incline } from 'lvovich';
import * as moment from 'moment';
import { ContextStoreService } from '../../core/store/context-store.service';

@Injectable({
  providedIn: 'root'
})
export class PrintHelperService {
  constructor(private contextStoreService: ContextStoreService) {}

  public printStatement(html: string, employee: string, dateStart: string, dateEnd: string) {
    const content = this.formatHtml(html, employee, dateStart, dateEnd);
    const popupWin = window.open('', 'self');
    popupWin.document.open();
    popupWin.document.write('<html><body afterprint="window.close()" onload="window.print()">' + content + '</html>');
    popupWin.document.close();
  }

  private formatHtml(html: string, employee: string, dateStart: string, dateEnd: string): string {
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
    console.log(blocks);
    const formatEmployee = incline({ last: employee.split(' ')[0], first: employee.split(' ')[1] }, 'genitive');
    /** html concat */
    const headersHtml = `${blocks[0]}${companyName}${blocks[1]}${position}${blocks[2]}${mainManager}${blocks[3]}${
      formatEmployee.last
    } ${formatEmployee.first}`;
    const dateStartHtml = `${blocks[4]}${dayAndMonthStart[0]}${blocks[5]}${dayAndMonthStart[1]}${
      blocks[6]
    }${dateStartMoment.format('YYYY')}${blocks[7]}`;
    const dateEndHtml = `${dayAndMonthEnd ? dayAndMonthEnd[0] : ''}${blocks[8]}${
      dayAndMonthEnd ? dayAndMonthEnd[1] : ''
    }${blocks[9]}${dateEnd ? dateEndMoment.format('YYYY') : ''}${blocks[10]}`;
    const daysCountHtml = `${daysCount}${blocks[11]}`;
    const footerHtml = `${dayNow[0]}${blocks[12]}${dayNow[1]}${blocks[13]}${dayNow[2]}${blocks[14]}${employee}${
      blocks[15]
    }`;

    return `${headersHtml}${dateStartHtml}${dateEndHtml}${daysCountHtml}${footerHtml}`;
  }
}
