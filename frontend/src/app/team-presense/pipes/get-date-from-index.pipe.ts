import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDateFromIndex'
})
export class GetDateFromIndexPipe implements PipeTransform {

  transform(index: number, dateStr: string): string {
    if (index < 10) {
      return `${dateStr}0${index}`;
    }
    return `${dateStr}${index}`;
  }
}
