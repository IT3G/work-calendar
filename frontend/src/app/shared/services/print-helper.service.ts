import { Injectable, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';
import { first } from 'rxjs/operators';
import { PrintComponent } from '../models/print-component.model';
import { WorkHolidayComponent } from '../components/print/work-holiday/work-holiday.component';
import { WorkHolidayPrint } from '../models/work-holiday-print.model';

@Injectable({
  providedIn: 'root'
})
export class PrintHelperService {
  /** ссылка на контейнер, в котором будут создаваться печатные компоненты */
  private printContainer: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) {}

  public printWorkHoliday(data: WorkHolidayPrint): void {
    this.printComponent(WorkHolidayComponent, data);
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

    componentInstance.instance.data = data;
    componentInstance.instance.readyToPrint.pipe(first()).subscribe(() => {
      window.onafterprint = () => {
        componentInstance.destroy();
      };

      window.print();
    });

    this.printContainer.insert(componentInstance.hostView);
    componentInstance.changeDetectorRef.detectChanges();
  }
}
