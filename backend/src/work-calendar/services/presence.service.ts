import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as moment from 'moment';
import { Model } from 'mongoose';
import { UsersService } from 'src/profile/services/users.service';
import { TaskEntity } from '../../entity/entities/task.entity';
import { PresenseRequestDto } from '../dto/presence-request.dto';
import { TaskType } from '../models/task-type.enum';
import { TaskService } from './task.service';

@Injectable()
export class PresenceSerivce {
  constructor(
    @InjectModel('Tasks') private readonly taskModel: Model<TaskEntity>,
    private taskService: TaskService,
    private userService: UsersService
  ) {}

  async getPresenceByDate(dateStart: string, dateEnd: string): Promise<any[]> {
    const start = moment(dateStart).format('YYYY-MM-DD');
    const end = moment(dateEnd).format('YYYY-MM-DD');

    const rangeOfDate = this.getRangeOfDate(dateStart, dateEnd);

    const users = await this.userService.getUsers();
    const tasks = await this.taskService.getTasksInPeriod(start, end);

    console.log(moment('2020-01-15').isBetween('2020-01-10', '2020-01-20'));

    // const result = tasks
    //   .sort((a, b) => {
    //     return moment(a.dateStart).diff(moment(b.dateStart));
    //   })
    //   .map(t => {
    //     const response = [];
    //     rangeOfDate.forEach(date => {
    //       if (moment(date).isBetween(t.dateStart, t.dateEnd, null, '[]')) {
    //         response.push({
    //           date,
    //           type: this.taskService.getTaskTypeName(TaskType[t.type]),
    //           email: users.find(user => user.mailNickname === t.employee).email
    //         });
    //       }
    //     });
    //     return response;
    //   });
    const result = rangeOfDate.map((date) => {
      const response = [];
      tasks.forEach((task) => {
        if (moment(date).isBetween(task.dateStart, task.dateEnd, null, '[]')) {
          response.push({
            date,
            type: this.taskService.getTaskTypeName(TaskType[task.type]),
            email: users.find((user) => user.mailNickname === task.employee).email,
          });
        }
      });
      return response;
    });

    return result;
  }

  private getRangeOfDate(startDate: string, stopDate: string): any[] {
    const dateArray = [];
    const endDate = moment(stopDate);

    let currentDate = moment(startDate);

    while (currentDate < endDate) {
      dateArray.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'days');
    }

    return dateArray;
  }
}
