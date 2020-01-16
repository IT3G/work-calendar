import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';
import { UserEntity } from '../../entity/entities/user.entity.model';
import { FollowService } from './follow.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<UserEntity>, public followService: FollowService) {
  }

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

  async registration(userInfo: LoginModel): Promise<UserEntity> {
    const data: UserModel = {
      id: null,
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
      hashPassword: crypto.createHmac('sha256', userInfo.password).digest('hex')
    };

    const newUser = await this.userModel.create(data);
    return newUser.save();
  }

  async updateUserByLogin(login: string, data: UserModel): Promise<UserEntity> {

    const allUsers = await this.getUsers();
    const lastUserProjects = await this.getUserById(data.id);
    const currentUserProjects = data.projects;

    console.log(currentUserProjects.length);

    console.log(lastUserProjects.projects.length);


    return await this.userModel.updateOne({ mailNickname: login }, { ...data });
  }
}
