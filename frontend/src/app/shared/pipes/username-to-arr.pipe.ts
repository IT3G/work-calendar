import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernameToArr'
})
export class UsernameToArrPipe implements PipeTransform {

  transform(value: string): string[] {
    if (!value) {
      return;
    }
    return  value.split(' ');
  }
}
