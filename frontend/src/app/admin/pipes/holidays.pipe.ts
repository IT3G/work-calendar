import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'holidays'
})
export class HolidaysPipe implements PipeTransform {

  transform(value: any, days?: string[]): any {
    return value;
  }

}
