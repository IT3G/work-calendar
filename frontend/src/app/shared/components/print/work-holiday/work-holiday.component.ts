import { Component, EventEmitter, AfterViewChecked } from '@angular/core';
import { PrintComponent } from '../../../models/print-component.model';

/** Компонент печатной формы заявления на отпуск */
@Component({
  selector: 'app-work-holiday',
  templateUrl: 'work-holiday.component.html',
  styleUrls: ['work-holiday.component.scss']
})
export class WorkHolidayComponent implements PrintComponent, AfterViewChecked {
  public readyToPrint = new EventEmitter<void>();

  public data: Object;

  public ngAfterViewChecked(): void {
    this.readyToPrint.emit();
  }
}
