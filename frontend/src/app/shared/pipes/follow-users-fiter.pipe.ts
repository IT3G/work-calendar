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

    const followingArr = following.map(item => item._id);
    const removedArr = removed.map(el => {
      const test = el.followingId as Employee;
      return test._id;
    });

    const commonArr = [...followingArr, ...removedArr];

    return users.filter(user => {
      return !commonArr.some(el => el === user._id);
    });
  }
}
