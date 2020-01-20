import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FollowEntity } from '../../entity/entities/follow.entity.model';
import { FollowerModel } from '../models/follow.model';
import { UserEntity } from '../../entity/entities/user.entity.model';
import { UserModel } from '../models/user.model';
import * as moment from 'moment';
import { AddedProjectModel } from '../models/added-project.model';

@Injectable()
export class FollowService {
  constructor(@InjectModel('Follow') private readonly followModel: Model<FollowEntity>) {
  }

  async getFollowers(): Promise<FollowerModel[]> {
    return await this.followModel.find().exec();
  }

  async getFollowesByProject(projectId: string): Promise<FollowerModel[]> {
    return await this.followModel.find({ projectId }).exec();
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

  async removeFollow(id: string): Promise<FollowerModel> {
    return await this.followModel.findByIdAndDelete(id);
  }

  async updateFollowForProject({ projects: prevProjects, _id: currentUserId }: UserEntity, { projects: currentProjects }: UserModel, allUsers: UserEntity[]) {
    const prevProjectIdsSet = this.getSetProject(prevProjects);
    const currentProjectIdsSet = this.getSetProject(currentProjects);

    const addedProjects = currentProjects.filter(item => {
      return !prevProjectIdsSet.has(item.project);
    });

    const removedProjects = prevProjects.filter(item => {
      return !currentProjectIdsSet.has(item.project);
    });

    this.createFollowings(addedProjects, currentUserId, allUsers);
    this.removeFollowings(removedProjects, currentUserId);
  }

  private createFollowings(addedProjects: AddedProjectModel[], currentUserId: string, allUsers: UserEntity[]) {
    return addedProjects.forEach(project => {
      const users = this.getUsersForProject(project.project, allUsers);

      users.forEach(user => {
        this.createTwoWayFollow(currentUserId, project.project, user.id);
      });
    });
  }

  private removeFollowings(removedProjects: AddedProjectModel[], currentUserId: string) {
    removedProjects.forEach(project => {
      this.removeFollowByProject(project.project, currentUserId);
    });
  }

  async removeFollowByProject(projectId: string, currentUser: string): Promise<void> {
    const followers = await this.getFollowesByProject(projectId);
    const onlyCurrentUserFollowes = followers.filter(item => {
      return item.followingId.toString() === currentUser.toString()
        || item.followerId.toString() === currentUser.toString();
    });

    onlyCurrentUserFollowes.forEach(follow => (
      this.removeFollow(follow._id)
    ));
  }

  async createTwoWayFollow(follower: string, project: string, following: string): Promise<void> {
    const data = {
      followerId: follower,
      followingId: following,
      projectId: project,
    };
    const dataBack = {
      followerId: following,
      followingId: follower,
      projectId: project,
    };

    await this.addFollow(data);
    await this.addFollow(dataBack);
  }

  private getSetProject(projects): Set<string> {
    const projectIds = projects.map(item => item.project);
    return new Set(projectIds);
  }

  // private isProjectActiveToday(project: AddedProjectModel): boolean {
  //   project.dateStart = project.dateStart ? project.dateStart : moment('1900-01-01').format();
  //   project.dateEnd = project.dateEnd ? project.dateEnd : moment('2100-01-01').format();
  //   return moment().isBetween(project.dateStart, project.dateEnd);
  // }

  private getUsersForProject(projectId: string, users: UserEntity[]): UserEntity[] {
    return users.filter(emp => {
      return emp.projects.some(p => p.project === projectId);
    });
  }
}
