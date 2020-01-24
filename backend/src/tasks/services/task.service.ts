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

@Injectable()
export class TaskService {
  constructor(@InjectModel('Tasks') private readonly taskModel: Model<TaskEntity>,
              private sendMailService: SendMailService,
              private userService: UsersService,
              private followService: FollowService
  ) {
  }

  async getTasks(): Promise<TaskModel[]> {
    return await this.taskModel.find().exec();
  }

  async getTasksByAuthor(author: string): Promise<TaskModel[]> {
    return await this.taskModel.find({ employeeCreated: author }).exec();
  }

  async addTask(task: TaskModel): Promise<TaskModel> {
    this.sendMail(task);

    return await this.taskModel.create(task);
  }

  private async sendMail(task: TaskModel): Promise<void> {
    try {
      const userSubject = await this.userService.getUserByLogin(task.employee);
      const userCreated = await this.userService.getUserByLogin(task.employeeCreated);
      const userFollowers = await this.followService.getMyFollowers(userSubject.id);
      let addressesArray = userFollowers.map(user => user.email);

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
        dateEnd: task.dateEnd
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
      [TaskType.SICK]: 'Болезнь'
    });

    if (taskTypeMap[type]) {
      return taskTypeMap[type];
    }

    return 'Статус не определен';
  }
}
