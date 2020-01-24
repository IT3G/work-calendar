import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernamePipe'
})
export class UsernamePipe implements PipeTransform {
  /**Функция получения первых букв фамилии, имени */
  transform(value: string): string {
    if (!value) {
      return;
    }
    const [surname, name, ...rest] = value.split(' ');

    if (!name) {
      return surname[0];
    }

    return `${name[0]}${surname[0]}`;
  }
}
