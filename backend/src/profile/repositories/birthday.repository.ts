import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../../entity/entities/user.entity';
import { UserBirthdayDto } from '../dto/user-birthday.dto';

@Injectable()
export class BirthdayRepository {
  constructor(@InjectModel('Users') private readonly userModel: Model<UserEntity>) {}

  async findUsersByBirthdayMonthId(monthId: number): Promise<UserBirthdayDto[]> {
    return await this.userModel
      .aggregate([
        ...this.aggregateInnerFields(),
        ...this.aggregateProject(),
        { $match: { month: monthId } },
        { $sort: { day: 1 } }
      ])
      .exec();
  }

  async findUsersWithEmptyBirthday(): Promise<UserBirthdayDto[]> {
    return await this.userModel
      .aggregate([
        ...this.aggregateInnerFields(),
        ...this.aggregateProject(),
        { $match: { birthday: null } },
        { $sort: { day: 1 } }
      ])
      .exec();
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
          day: {
            $dayOfMonth: {
              $dateFromString: {
                dateString: '$birthday'
              }
            }
          },
          month: {
            $month: {
              $dateFromString: {
                dateString: '$birthday'
              }
            }
          }
        }
      }
    ];
  }

  private aggregateInnerFields() {
    return [
      {
        $lookup: {
          from: 'subdivisions',
          localField: 'subdivision',
          foreignField: '_id',
          as: 'sd'
        }
      },
      {
        $unwind: {
          path: '$sd',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'jobpositions',
          localField: 'jobPosition',
          foreignField: '_id',
          as: 'jp'
        }
      },
      {
        $unwind: {
          path: '$jp',
          preserveNullAndEmptyArrays: true
        }
      }
    ];
  }
}
