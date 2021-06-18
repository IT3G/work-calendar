import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as moment from 'moment';
import { Model } from 'mongoose';
import { UsersService } from 'src/profile/services/users.service';
import { TaskEntity } from '../../entity/entities/task.entity';
import { PresenceRequestDto } from '../dto/presence-request.dto';
import { TaskType } from '../models/task-type.enum';
import { TaskService } from './task.service';

@Injectable()
export class PresenceSerivce {
  constructor(
    @InjectModel('Tasks') private readonly taskModel: Model<TaskEntity>,
    private taskService: TaskService,
    private userService: UsersService
  ) {}

  async getPresenceByDate(dateStart: string, dateEnd: string): Promise<PresenceRequestDto[]> {
    const start = moment(dateStart).format('YYYY-MM-DD');
    const end = moment(dateEnd).format('YYYY-MM-DD');

    const rangeOfDate = this.getRangeOfDate(dateStart, dateEnd);

    const users = (await this.userService.getUsers()).sort((a, b) => b.email.localeCompare(a.email));
    const tasks = await this.taskService.getTasksInPeriod(start, end);

    const result = tasks
      .sort((a, b) => {
        return moment(a.dateStart).diff(moment(b.dateStart));
      })

      .map((task) => {
        const response = [];
        rangeOfDate.forEach((date) => {
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

    const flatResult = this.flat(result);

    return this.removeRepeatedWrongInfo(flatResult);
  }

  private removeRepeatedWrongInfo(result: PresenceRequestDto[]): PresenceRequestDto[] {
    const newResult = [];
    result.reverse().forEach((task) => {
      !newResult.find((innerTask) => {
        return innerTask.date === task.date && innerTask.email === task.email;
      }) && newResult.push(task);
    });

    return newResult.reverse();
  }

  private getRangeOfDate(startDate: string, stopDate: string): any[] {
    const dateArray = [];
    const endDate = moment(stopDate);

    let currentDate = moment(startDate);

    while (currentDate <= endDate) {
      dateArray.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'days');
    }

    return dateArray;
  }

  private flat(array: PresenceRequestDto[][]): PresenceRequestDto[] {
    return array.reduce((acc, val) => acc.concat(val), []);
  }
}
