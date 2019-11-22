import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { LoginRequestModel } from '../../auth/models/login.request.model';
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

  async registration(userInfo: LoginRequestModel): Promise<UserEntity> {
    const data: UserResponseModel = {
      username: userInfo.name,
      location: null,
      position: null,
      projects: [],
      whenCreated: null,
      email: `${userInfo.username}@it2g.ru`,
      telNumber: null,
      physicalDeliveryOfficeName: null,
      mailNickname: userInfo.username,
      isAdmin: false,
      hasMailing: false,
      subdivision: null,
      jobPosition: null,
      authType: 'hash',
      hashPswd: crypto.createHmac('sha256', userInfo.password).digest('hex')
    };
    console.log(data);
    const newUser = await this.userModel.create(data);
    return newUser.save();
  }

  async updateUserByLogin(login: string, data: UserResponseModel): Promise<UserEntity> {
    const result = await this.userModel.updateOne({ mailNickname: login }, { ...data });
    return result;
  }
}
