import { Model } from 'mongoose';
import { UserModel } from '../models/user.model';
import { UserEntity } from '../../entity/entities/user.entity.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<UserEntity>) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.userModel
      .find()
      .populate('jobPosition')
      .populate('subdivision')
      .sort({ username: 'asc' })
      .exec();
  }

  async getUserByLogin(mailNickname: string): Promise<UserEntity> {
    const employeeRegex = new RegExp(`^${mailNickname}$`, 'i');
    return await this.userModel
      .findOne({ mailNickname: employeeRegex })
      .populate('jobPosition')
      .populate('subdivision')
      .exec();
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.userModel
      .findById(id)
      .populate('jobPosition')
      .populate('subdivision')
      .exec();
  }

  async addUser(userInfo: UserModel): Promise<UserEntity> {
    const newUser = await this.userModel.create(userInfo);
    return newUser.save();
  }

  async updateUserByLogin(login: string, data: UserModel): Promise<UserEntity> {
    return await this.userModel.updateOne({ mailNickname: login }, { ...data });
  }
}
