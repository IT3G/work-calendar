import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskEntity } from '../../entity/entities/task.entity';
import { UserEntity } from '../../entity/entities/user.entity';
import { PresenceModel } from '../models/presence.model';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel('Tasks') private readonly taskModel: Model<TaskEntity>,
    @InjectModel('Users') private readonly userModel: Model<UserEntity>
  ) {}
  async getTasksByMonth(startOfMonth: string, endOfMonth: string): Promise<PresenceModel[]> {
    return await this.userModel
      .aggregate([
        {
          $match: {
            $or: [{ terminationDate: null }, { terminationDate: { $gte: startOfMonth } }],
          },
        },
        {
          $lookup: {
            from: 'tasks',
            localField: 'mailNickname',
            foreignField: 'employee',
            as: 'tasks',
          },
        },
        {
          $lookup: {
            from: 'jobpositions',
            localField: 'jobPosition',
            foreignField: '_id',
            as: 'jp',
          },
        },
        {
          $unwind: {
            path: '$jp',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            employee: {
              mailNickname: '$mailNickname',
              username: '$username',
              jobPosition: '$jp',
            },
            tasks: {
              $filter: {
                input: '$tasks',
                as: 't',
                cond: this.getTasksInPeriodQuery(startOfMonth, endOfMonth),
              },
            },
          },
        },
      ])
      .exec();
  }

  public async getTasksInPeriod(dateStart: string, dateEnd: string): Promise<TaskEntity[]> {
    return await this.taskModel.aggregate([{ $filter: this.getTasksInPeriodQuery(dateStart, dateEnd) }]).exec();
  }

  private getTasksInPeriodQuery(dateStart: string, dateEnd: string): Object {
    // a >= start <= b  || a >= end <= b || start < a && end > b
    return {
      $or: [
        {
          $or: [{ $gte: ['$$t.dateStart', dateStart] }, { $lte: ['$$t.dateStart', dateEnd] }],
        },
        {
          $or: [{ $gte: ['$tt.dateEnd', dateStart] }, { $lte: ['$tt.dateEnd', dateEnd] }],
        },
        {
          $or: [{ $gte: ['$t.dateEnd', dateEnd] }, { $lte: ['$t.dateStart', dateStart] }],
        },
      ],
    };
  }
}
