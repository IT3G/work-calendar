import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.model';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'avatarSource'
})
export class AvatarSourcePipe implements PipeTransform {
  transform(value: Employee, args?: any): any {
    return `${environment.baseUrl}/avatar?login=` + value.mailNickname;
  }
}
