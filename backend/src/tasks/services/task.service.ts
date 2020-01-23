import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskEntity } from '../../entity/entities/task.request.model';
import { TaskResponseModel } from '../models/task.request.model';
import { SendMailService } from '../../mail/services/send-mail.service';
import { SendMailRequestModel } from '../../mail/models/send-mail.request.model';
import { UsersService } from '../../users/services/users.service';
import { FollowService } from '../../users/services/follow.service';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Tasks') private readonly taskModel: Model<TaskEntity>,
              private sendMailService: SendMailService,
              private userService: UsersService,
              private followService: FollowService
  ) {
  }

  async getTasks(): Promise<TaskResponseModel[]> {
    return await this.taskModel.find().exec();
  }

  async getTasksByAuthor(author: string): Promise<TaskResponseModel[]> {
    return await this.taskModel.find({ employeeCreated: author }).exec();
  }

  async addTask(task: TaskResponseModel): Promise<TaskResponseModel> {
    const newTask = await this.taskModel.create(task);

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
      status: this.getTaskTypeName(task.type),
      comment: task.comment,
      dateEnd: task.dateEnd,
    };

    if (addressesArray.length) {
      await this.sendMailService.sendMail(mailData);
    }

    return newTask.save();
  }

  private getTaskTypeName(type: string): string {
    if (type === 'COMMON') {
      return 'Стандартно';
    }
    if (type === 'CUSTOM') {
      return 'Особое';
    }
    if (type === 'LEFT') {
      return 'Отсутствие';
    }
    if (type === 'VACATION') {
      return 'Отпуск';
    }
    if (type === 'SICK') {
      return 'Болезнь';
    }
    return 'Статус не определен';
  }
}
