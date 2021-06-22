import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { FollowEntity } from 'src/entity/entities/follow.entity.model';
import { UserEntity } from '../../entity/entities/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UserEntity>,
    @InjectModel('Follow') private readonly followModel: Model<FollowEntity>
  ) {}
  async getUsers(): Promise<UserEntity[]> {
    return await this.userModel
      .find()
      .populate('jobPosition')
      .populate('subdivision')
      .populate('projectOffice')
      .populate('skills')
      .sort({ username: 'asc' })
      .exec();
  }

  async getUsersLocation(): Promise<string[]> {
    return await this.userModel
      .find({ $or: [{ terminationDate: { $gte: new Date().toISOString() } }, { terminationDate: null }] })
      .distinct('location')
      .exec();
  }

  async getUserByLogin(mailNickname: string): Promise<UserEntity> {
    const employeeRegex = new RegExp(`^${mailNickname}$`, 'i');

    return await this.userModel
      .findOne({ mailNickname: employeeRegex })
      .populate('jobPosition')
      .populate('subdivision')
      .populate('projectOffice')
      .populate('skills')
      .exec();
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.userModel
      .findById(id)
      .populate('jobPosition')
      .populate('subdivision')
      .populate('projectOffice')
      .populate('skills')
      .exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
    await this.followModel.deleteMany({ followerId: id });
    await this.followModel.deleteMany({ followingId: id });
  }

  async addUser(userInfo: UserDto): Promise<UserEntity> {
    const newUser = await this.userModel.create(userInfo);
    return newUser.save();
  }

  async updateLastTimeOnline(login: string): Promise<void> {
    await this.userModel.updateOne(
      {
        mailNickname: login,
      },
      { $set: { lastTimeOnline: moment().toString() } }
    );
  }

  async updateUserByLogin(login: string, data: UserDto): Promise<UserEntity> {
    const currentUser = await this.getUserByLogin(login);
    const skillsId = new Set();
    const newSkills = { ...data }.skills?.filter((skill) => {
      if (skillsId.has(skill._id)) {
        return false;
      }
      skillsId.add(skill._id);
      return true;
    });

    const birthday = data.birthday && moment(data.birthday).format('YYYY-MM-DD');

    await this.userModel.updateOne(
      { mailNickname: login },
      {
        ...data,
        birthday,
        skills: newSkills ?? currentUser.skills,
      }
    );
    return await this.getUserByLogin(login);
  }
}
