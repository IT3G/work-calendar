import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { FollowEntity } from '../../entity/entities/follow.entity.model';
import { FollowerModel } from '../models/follow.model';

@Injectable()
export class FollowService {
  constructor(@InjectModel('Follow') private readonly followModel: Model<FollowEntity>) {
  }

  async getFollowers(): Promise<FollowerModel[]> {
    return await this.followModel.find().exec();
  }

  async getMyFollowing(userId: string): Promise<FollowerModel[]> {
    return await this.followModel.find({ followerId: userId }).populate('followingId').exec();
  }

  async getMyFollowers(userId: string): Promise<FollowerModel[]> {
    return await this.followModel.find({ followingId: userId }).populate('followerId').exec();
  }

  async addFollow(data: FollowerModel): Promise<FollowerModel> {
    const newFollow = await this.followModel.create(data);
    return newFollow.save();
  }

  async delete(id: number): Promise<FollowerModel> {
    return await this.followModel.findByIdAndDelete(id);
  }
}
