import { Component, ViewContainerRef, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { PrintHelperService } from '../../../services/print-helper.service';

/** Компонент-контейнер для динамически создаваемых печатных компонент */
@Component({
  selector: 'app-print-wrapper',
  template: '<ng-template #printableComponent></ng-template>',
  styleUrls: ['./print-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintWrapperComponent implements AfterViewInit {
  /** ссылка на контейнер отображения динамических компонент */
  @ViewChild('printableComponent', {
    read: ViewContainerRef
  })
  viewContainerRef: ViewContainerRef;

  constructor(private printService: PrintHelperService) {}

  public ngAfterViewInit(): void {
    this.printService.setPrintContainer(this.viewContainerRef);
  }
}
