import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { HolidaysModel } from '../../../../shared/models/holidays.model';
import { PresenceModel } from '../../../../shared/models/presence.page.model';

@Component({
  selector: 'app-team-presence-table',
  templateUrl: './team-presence-table.component.html',
  styleUrls: ['./team-presence-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPresenceTableComponent implements OnChanges {
  @Input()
  monthData: PresenceModel[];

  @Input()
  monthDays: moment.Moment[];

  @Input()
  date: moment.Moment;

  @Input()
  holidays: HolidaysModel[];

  @Input()
  @HostBinding('class.blur')
  loadInProgress: boolean;

  yearAndMonth: string;
  daysInMonth: number;
  daysHeader: string[];

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.monthData && !simpleChanges.monthDays) {
      this.daysInMonth = this.monthDays.length;
      this.daysHeader = this.monthDays.map(d => d.format());
      this.yearAndMonth = this.date.format('YYYY-MM-');
    }
  }
}
