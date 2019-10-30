import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginResponseModel } from 'src/auth/models/login.response.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<LoginResponseModel>,
  ) {}

  async getUsers(): Promise<LoginResponseModel[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUserByLogin(mailNickname: string): Promise<LoginResponseModel[]> {
    const user = await this.userModel
      .find({ mailNickname: mailNickname })
      .exec();
    return user;
  }

  async getUserById(id: string): Promise<LoginResponseModel[]> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async addUser(userInfo: LoginResponseModel): Promise<LoginResponseModel> {
    const newUser = await this.userModel(userInfo);
    return newUser.save();
  }

  async updateUserById(
    id: string,
    data: LoginResponseModel,
  ): Promise<LoginResponseModel> {
    const result = await this.userModel.findByIdAndUpdate(id, { ...data });
    return result;
  }
}
