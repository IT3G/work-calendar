import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model, Types } from 'mongoose';
import { TaskEntity } from '../../entity/entities/task.entity';
import { UserEntity } from '../../entity/entities/user.entity';
import { TaskRequestDto } from '../dto/task-request.dto';
import { PresenceModel } from '../models/presence.model';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel('Tasks') private readonly taskModel: Model<TaskEntity>,
    @InjectModel('Users') private readonly userModel: Model<UserEntity>
  ) {}
  async getTasksByMonth(taskRequest: TaskRequestDto): Promise<PresenceModel[]> {
    const startOfMonth = moment(taskRequest.date).startOf('month').toISOString();
    const endOfMonth = moment(taskRequest.date).endOf('month').toISOString();

    return await this.userModel
      .aggregate([
        {
          $match: {
            $and: [
              { $or: [{ terminationDate: null }, { terminationDate: { $gte: startOfMonth } }] },
              ...this.getTaskFilters(taskRequest),
            ],
          },
        },
        {
          $sort: { username: 1 },
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
    return await this.taskModel
      .aggregate([
        {
          $match: {
            $or: [
              {
                dateStart: { $gte: dateStart, $lte: dateEnd },
              },
              {
                dateEnd: { $gte: dateStart, $lte: dateEnd },
              },
              {
                $or: [{ dateEnd: { $gte: dateEnd } }, { dateStart: { $lte: dateStart } }],
              },
            ],
          },
        },
      ])
      .exec();
  }

  private getTaskFilters(taskRequest: TaskRequestDto) {
    const year = +moment(taskRequest.date).format('YYYY');
    const month = +moment(taskRequest.date).format('M');

    const locationFilter = taskRequest.location ? { location: taskRequest.location } : null;
    const subdivisionFilter = taskRequest.subdivision
      ? { subdivision: new Types.ObjectId(taskRequest.subdivision) }
      : null;
    const jobPositionFilter = taskRequest.jobPosition
      ? { jobPosition: new Types.ObjectId(taskRequest.jobPosition) }
      : null;
    const projectsFilter = taskRequest.project
      ? {
          projectsNew: {
            $elemMatch: {
              project_id: new Types.ObjectId(taskRequest.project),
              metadata: { $elemMatch: { year, month } },
            },
          },
        }
      : null;
    const nameFilter = taskRequest.name?.length
      ? {
          username: {
            $regex: taskRequest.name,
            $options: '$i',
          },
        }
      : null;

    return [locationFilter, subdivisionFilter, jobPositionFilter, projectsFilter, nameFilter].filter((val) => !!val);
  }

  private getTasksInPeriodQuery(dateStart: string, dateEnd: string): Object {
    // a >= start <= b  || a >= end <= b || start < a && end > b
    return {
      $or: [
        {
          $or: [{ $gte: ['$dateStart', dateStart] }, { $lte: ['$dateStart', dateEnd] }],
        },
        {
          $or: [{ $gte: ['$dateEnd', dateStart] }, { $lte: ['$dateEnd', dateEnd] }],
        },
        {
          $or: [{ $gte: ['$dateEnd', dateEnd] }, { $lte: ['$dateStart', dateStart] }],
        },
      ],
    };
  }
}
