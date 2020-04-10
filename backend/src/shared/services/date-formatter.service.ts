import { Injectable } from '@nestjs/common';

import * as moment from 'moment';

@Injectable()
export class DateFormatter {
  public parseDateStringToRussianLocale(isoDateString: string): string {
    return moment(isoDateString).format('DD.MM.YYYY');
  }
}
