import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskEntity } from '../../entity/entities/task.request.model';
import { SendMailService } from '../../mail/services/send-mail.service';
import { SendMailRequestModel } from '../../mail/models/send-mail.request.model';
import { UsersService } from '../../users/services/users.service';
import { FollowService } from '../../users/services/follow.service';
import { TaskModel } from '../models/task.model';
import { TaskType } from '../models/task-type.enum';
import * as moment from 'moment';
import { PresenceModel } from '../models/task-month.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Tasks') private readonly taskModel: Model<TaskEntity>,
    private sendMailService: SendMailService,
    private userService: UsersService,
    private followService: FollowService,
  ) {}

  async getTasks(): Promise<TaskEntity[]> {
    return await this.taskModel.find().exec();
  }

  async getTasksByAuthor(author: string): Promise<TaskEntity[]> {
    return await this.taskModel.find({ employeeCreated: author }).exec();
  }

  async getTasksByEmployee(employee: string): Promise<TaskEntity[]> {
    return await this.taskModel.find({ employee }).exec();
  }

  async udpdateOne(id: string, task: Partial<TaskModel>): Promise<TaskEntity> {
    await this.taskModel.findByIdAndUpdate(id, task);
    return await this.taskModel.findById(id);
  }

  async deleteById(id: string): Promise<TaskEntity> {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async getTasksByMonth(date: string): Promise<PresenceModel[]> {
    const startOfMonth = moment(date)
      .clone()
      .startOf('month')
      .format('YYYY-MM-DD');
    const endOfMonth = moment(date)
      .clone()
      .endOf('month')
      .format('YYYY-MM-DD');

    const users = await this.userService.getUsers();
    // a >= start <= b  || a >= end <= b || start < a && end > b
    const tasks = await this.taskModel.find({
      $or: [
        {
          dateStart: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
        {
          dateEnd: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
        {
          $and: [
            {
              dateStart: {
                $lte: startOfMonth,
              },
            },
            {
              dateEnd: {
                $gte: endOfMonth,
              },
            },
          ],
        },
      ],
    });

    const result = users.map((employee) => {
      const currentUserTasks = tasks.filter((i) => i.employee === employee.mailNickname);
      const day = moment(date)
        .clone()
        .startOf('month');

      const res = {
        employee,
        tasks: [],
      };

      while (day.isSameOrBefore(endOfMonth)) {
        const task = currentUserTasks
          .filter((i) => {
            if (i.dateEnd) {
              return day.isBetween(moment(i.dateStart), moment(i.dateEnd), 'day', '[]');
            }

            return day.isSame(moment(i.dateStart), 'day');
          })
          .sort((a, b) => (moment(a.dtCreated).isAfter(moment(b.dtCreated)) ? -1 : 1));

        const lastTask = task[0] || { dateStart: day.format('YYYY-MM-DD') };

        res.tasks = [...res.tasks, lastTask];

        day.add(1, 'd');
      }
      return res;
    });
    return result;
  }

  async addTask(task: TaskModel): Promise<TaskEntity> {
    this.sendMail(task);

    const { _id = null, ...newTask } = task;

    return await this.taskModel.create(newTask);
  }

  private async sendMail(task: TaskModel): Promise<void> {
    try {
      const userSubject = await this.userService.getUserByLogin(task.employee);
      const userCreated = await this.userService.getUserByLogin(task.employeeCreated);
      const userFollowers = await this.followService.getUserFollowers(userSubject.id);
      let addressesArray = userFollowers.map((user) => user.email);

      if (userSubject.id.toString() !== userCreated.id.toString()) {
        addressesArray = [...addressesArray, userSubject.email];
      }

      const mailData: SendMailRequestModel = {
        address: addressesArray,
        author: userCreated.username,
        date: task.dateStart,
        user: userSubject.username,
        status: this.getTaskTypeName(task.type as TaskType),
        comment: task.comment,
        dateEnd: task.dateEnd,
      };

      if (addressesArray.length) {
        await this.sendMailService.sendMail(mailData);
      }
    } catch (e) {
      console.error('Ошибка при рассылке', e);
    }
  }

  private getTaskTypeName(type: TaskType): string {
    const taskTypeMap = Object.freeze({
      [TaskType.COMMON]: 'Стандартно',
      [TaskType.CUSTOM]: 'Особое',
      [TaskType.LEFT]: 'Отсутствие',
      [TaskType.VACATION]: 'Отпуск',
      [TaskType.SICK]: 'Болезнь',
    });

    if (taskTypeMap[type]) {
      return taskTypeMap[type];
    }

    return 'Статус не определен';
  }
}
