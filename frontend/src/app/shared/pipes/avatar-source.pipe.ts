import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.model';

@Pipe({
  name: 'avatarSource'
})
export class AvatarSourcePipe implements PipeTransform {
  transform(value: Employee, args?: any): any {
    return `/backend/avatar?login=` + value.mailNickname;
  }
}
