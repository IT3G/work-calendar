import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../../entity/entities/login.entity.model';
import { UserResponseModel } from '../models/user.request.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<UserEntity>) {}

  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userModel
      .find()
      .populate('jobPosition')
      .sort({ username: 'asc' })
      .exec();
    return users;
  }

  async getUserByLogin(mailNickname: string): Promise<UserEntity[]> {
    const user = await this.userModel.find({ mailNickname }).exec();
    return user;
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userModel
      .findById(id)
      .populate('jobPosition')
      .exec();
    return user;
  }

  async addUser(userInfo: UserResponseModel): Promise<UserEntity> {
    const newUser = await this.userModel.create(userInfo);
    return newUser.save();
  }

  async updateUserByLogin(login: string, data: UserResponseModel): Promise<UserEntity> {
    const result = await this.userModel.updateOne({ mailNickname: login }, { ...data });
    return result;
  }
}
