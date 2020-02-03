import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthSelectorComponent {
  @Input()
  date: moment.Moment;

  @Output()
  prevMonth = new EventEmitter<void>();

  @Output()
  nextMonth = new EventEmitter<void>();
}
