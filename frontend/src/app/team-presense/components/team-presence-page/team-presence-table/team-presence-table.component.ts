import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { PresenceModel } from '../../../../shared/models/presence.page.model';
import * as moment from 'moment';
import { HolidaysModel } from '../../../../shared/models/holidays.model';

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

  yearAndMonth: string;
  daysInMonth: number;
  daysHeader: string[];

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.monthData && !simpleChanges.monthDays) {
      this.daysInMonth = this.monthDays.length;
      this.daysHeader = this.monthDays.map((d) => d.format());
      this.yearAndMonth = this.date.format('YYYY-MM-');
    }
  }
}
