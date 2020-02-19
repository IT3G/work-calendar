import { Injectable, ComponentFactoryResolver, ViewContainerRef, Type, ComponentRef } from '@angular/core';
import { incline } from 'lvovich';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ContextStoreService } from '../../core/store/context-store.service';
import { HttpClient } from '@angular/common/http';
import { PrintComponent } from '../models/print-component.model';
import { WorkHolidayComponent } from '../components/print/work-holiday/work-holiday.component';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrintHelperService {
  /** ссылка на контейнер, в котором будут создаваться печатные компоненты */
  private printContainer: ViewContainerRef;

  constructor(
    private contextStoreService: ContextStoreService,
    private http: HttpClient,
    private factoryResolver: ComponentFactoryResolver
  ) {}

  public printStatement(employee: string, dateStart: string, dateEnd: string): void {
    this.printComponent(WorkHolidayComponent, { employee });
  }

  /** задать ссылку на контейнер, в котором будут создаваться печатные компоненты */
  public setPrintContainer(printContainer: ViewContainerRef): void {
    this.printContainer = printContainer;
  }

  /**
   * Метод создает экземпляр указанной компоненты,
   * передает ему данные, запускает одну проверку изменений для отрисовки шаблона
   * и ждет когда экземпляр скажет, что отрисовался и готов к печати
   */
  private printComponent(component: Type<PrintComponent>, data: Object): void {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const componentInstance = factory.create(this.printContainer.injector);

    componentInstance.instance.readyToPrint.pipe(first()).subscribe(() => {
      window.onafterprint = () => {
        componentInstance.destroy();
      };

      window.print();
    });

    this.printContainer.insert(componentInstance.hostView);
    componentInstance.changeDetectorRef.detectChanges();
  }

  // public printStatement(employee: string, dateStart: string, dateEnd: string) {
  //   this.http.get('assets/html/print-vacation.html', { responseType: 'text' }).subscribe((html: string) => {
  //     const content = this.formatHtml(html, employee, dateStart, dateEnd);
  //     const popupWin = window.open('', 'self');
  //     popupWin.document.open();
  //     popupWin.document.write(
  //       '<html><body onafterprint="window.close()" onload="window.print()">' + content + '</html>'
  //     );
  //     popupWin.document.close();
  //   });
  // }

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

    const formatEmployee = incline({ last: employee.split(' ')[0], first: employee.split(' ')[1] }, 'genitive');

    const headersHtml = this.createHeaderHtml(blocks, companyName, position, mainManager, formatEmployee);

    const { dateStartHtml, dateEndHtml, daysCountHtml } = this.createDatesHtml(
      blocks,
      dayAndMonthStart,
      dateStartMoment,
      dayAndMonthEnd,
      dateEnd,
      dateEndMoment,
      daysCount
    );

    const footerHtml = `${dayNow[0]}${blocks[12]}${dayNow[1]}${blocks[13]}${dayNow[2]}${blocks[14]}${employee}${blocks[15]}`;

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
    return `${blocks[0]}${companyName}${blocks[1]}${position}${blocks[2]}${mainManager}${blocks[3]}${formatEmployee.last} ${formatEmployee.first}`;
  }
}
