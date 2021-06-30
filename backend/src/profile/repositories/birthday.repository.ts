import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../../entity/entities/user.entity';
import { UserBirthdayDto } from '../dto/user-birthday.dto';
import { Moment } from 'moment';

@Injectable()
export class BirthdayRepository {
  constructor(@InjectModel('Users') private readonly userModel: Model<UserEntity>) {}

  async findUsersByBirthdayMonthId(monthId: number): Promise<UserBirthdayDto[]> {
    return await this.userModel
      .aggregate([
        ...this.aggregateInnerFields(),
        ...this.aggregateProject(),
        { $match: { month: monthId } },
        { $sort: { day: 1 } },
      ])
      .exec();
  }

  async findUsersByPeriod(startDate: Moment, endDate: Moment): Promise<UserBirthdayDto[]> {
    return await this.userModel
      .aggregate([
        ...this.aggregateInnerFields(),
        ...this.aggregateProject(),
        this.aggregateRequestPeriod(startDate, endDate),
        { $sort: { month: 1, day: 1 } },
      ])
      .exec();
  }

  async findUsersWithEmptyBirthday(): Promise<UserBirthdayDto[]> {
    return await this.userModel
      .aggregate([
        ...this.aggregateInnerFields(),
        ...this.aggregateProject(),
        { $match: { birthday: null } },
        { $sort: { day: 1 } },
      ])
      .exec();
  }

  private aggregateRequestPeriod(startDate: Moment, endDate: Moment) {
    const startMonth = +startDate.format('M');
    const endMonth = +endDate.format('M');
    const startDay = +startDate.format('D');
    const endDay = +endDate.format('D');

    if (startMonth === endMonth) {
      return {
        $match: {
          $and: [{ month: startMonth }, { day: { $gte: startDay, $lte: endDay } }],
        },
      };
    }

    return {
      $match: {
        $or: [
          {
            $and: [{ month: startMonth }, { day: { $gte: startDay, $lte: +startDate.endOf('month').format('D') } }],
          },
          {
            $and: [{ month: endMonth }, { day: { $gte: 1, $lte: endDay } }],
          },
        ],
      },
    };
  }

  private aggregateProject() {
    return [
      {
        $project: {
          username: '$username',
          patronymic: '$patronymic',
          mailNickname: '$mailNickname',
          birthday: '$birthday',
          email: '$email',
          location: '$location',
          subdivision: '$sd',
          jobPosition: '$jp',
          projectOffice: '$po',
          day: {
            $dayOfMonth: {
              $dateFromString: {
                dateString: '$birthday',
              },
            },
          },
          month: {
            $month: {
              $dateFromString: {
                dateString: '$birthday',
              },
            },
          },
        },
      },
    ];
  }

  private aggregateInnerFields() {
    return [
      {
        $lookup: {
          from: 'subdivisions',
          localField: 'subdivision',
          foreignField: '_id',
          as: 'sd',
        },
      },
      {
        $unwind: {
          path: '$sd',
          preserveNullAndEmptyArrays: true,
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
        $lookup: {
          from: 'projectoffice',
          localField: 'projectOffice',
          foreignField: '_id',
          as: 'po',
        },
      },
      {
        $unwind: {
          path: '$po',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
  }
}
