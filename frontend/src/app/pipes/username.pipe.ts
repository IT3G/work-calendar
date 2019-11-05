import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernamePipe'
})
export class UsernamePipe implements PipeTransform {
  /**Функция получения первых букв фамилии, имени */
  transform(value: string): string {
    if (!value) return;
    const filteredStringArr = value.split(' ');
    const surname = filteredStringArr[0];
    const name = filteredStringArr[1];

    return `${name[0]}${surname[0]}`;
  }
}
