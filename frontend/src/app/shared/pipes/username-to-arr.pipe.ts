import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernameToArr',
})
export class UsernameToArrPipe implements PipeTransform {
  transform(value: string, withPatronymic = false): string[] {
    if (!value) {
      return;
    }

    if (withPatronymic) {
      return value.split('');
    }

    const [lastName, firstName, patronymik] = value.split(' ');

    return [lastName, firstName];
  }
}
