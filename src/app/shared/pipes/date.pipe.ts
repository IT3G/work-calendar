import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'datePipe',
})
export class DatePipe implements PipeTransform {
    /**Функция форматирования строки */
    transform(value: string, args: string): string {
        if (!value) {
            return '';
        }
        return moment(value)
            .locale('ru')
            .format(args);
    }
}
