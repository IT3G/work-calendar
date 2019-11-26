import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthSelectorComponent {
  @Input()
  date: string;

  @Output()
  prevMonth = new EventEmitter<void>();

  @Output()
  nextMonth = new EventEmitter<void>();
}
