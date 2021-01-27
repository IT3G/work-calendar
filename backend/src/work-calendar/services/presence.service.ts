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

  async getPresenceByDate(dateStart: string, dateEnd: string): Promise<PresenseRequestDto[]> {
    const start = moment(dateStart).format('YYYY-MM-DD');
    const end = moment(dateEnd).format('YYYY-MM-DD');

    const users = await this.userService.getUsers();
    const tasks = await this.taskService.getTasksInPeriod(start, end);

    const result = tasks
      .sort((a, b) => {
        return moment(a.dateStart).diff(moment(b.dateStart));
      })
      .map((t) => ({
        date: `${moment(t.dateStart).format('YYYY-MM-DD')} – ${moment(t.dateEnd).format('YYYY-MM-DD')}`,
        type: this.taskService.getTaskTypeName(TaskType[t.type]),
        name: users.find((user) => user.mailNickname === t.employee).username,
      }));

    return result;
  }
}
