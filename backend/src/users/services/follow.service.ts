import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FollowEntity } from '../../entity/entities/follow.entity.model';
import { FollowerModel } from '../models/follow.model';
import { UserEntity } from '../../entity/entities/user.entity.model';
import { UserModel } from '../models/user.model';

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

  public updateFollowForProject({ projects: prevProjects }: UserEntity, { projects: currentProjects }: UserModel) {
    const prevProjectIds = prevProjects.map(item => item.project);
    const prevProjectIdsSet = new Set(prevProjectIds);

    const currentProjectIds = currentProjects.map(item => item.project);
    const currentProjectIdsSet = new Set(currentProjectIds);

    const addedProjects = currentProjects.filter(item => {
      return !prevProjectIdsSet.has(item.project);
    });

    const removedProjects = prevProjects.filter(item => {
      return !currentProjectIdsSet.has(item.project);
    });

    // tslint:disable-next-line:no-console
    console.log(addedProjects);
  }
}
