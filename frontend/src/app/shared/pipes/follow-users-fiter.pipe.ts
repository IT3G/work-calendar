import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';
import { FollowModel } from '../models/follow.model';

@Pipe({
  name: 'followUsersFilter'
})
export class FollowUsersFilterPipe implements PipeTransform {

  transform(users: Employee[] = [], following: Employee[] = [], removed: FollowModel[] = []): Employee[] {
    if (!users) {
      return [];
    }
    const commonArr = [...following.map(item => item._id), ...removed.map(el => el.followingId._id)];

    return users.filter(user => {
      return !commonArr.some(el => el === user._id);
    });
  }
}
