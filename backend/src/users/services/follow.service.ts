import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FollowEntity, FollowType } from '../../entity/entities/follow.entity.model';
import { FollowerModel } from '../models/follow.model';
import * as moment from 'moment';
import { UserEntity } from '../../entity/entities/user.entity.model';
import { UsersService } from './users.service';

export interface UserFollow {
  following: UserEntity[];
  followers: UserEntity[];
  allForUser: FollowEntity[];
}

@Injectable()
export class FollowService {
  constructor(@InjectModel('Follow') private readonly followModel: Model<FollowEntity>,
              private userService: UsersService) {
  }

  async getUserFollow(userId: string): Promise<UserFollow> {
    const following = this.getMyFollowing(userId);
    const followers = this.getMyFollowers(userId);
    const allForUser = this.getAll(userId);

    return {
      following: await following,
      followers: await followers,
      allForUser: await allForUser,
    };
  }

  async getAll(userId: string): Promise<FollowEntity[]> {
    return await this.followModel
      .find({ $or: [{ followerId: userId }, { followingId: userId }] })
      .populate('followingId')
      .populate('followerId')
      .exec();
  }

  async getMyFollowing(currentUserId: string): Promise<UserEntity[]> {

    const allUsers = await this.userService.getUsers();
    const currentUser = await this.userService.getUserById(currentUserId);

    let followingByProjects = this.matchUsersAndActiveProjects(currentUser, allUsers);

    if (!currentUser.projects.length) {
      followingByProjects = allUsers;
    }

    const addedFollowing = await this.followModel
      .find({ followerId: currentUser.id, followType: FollowType.add })
      .exec();

    const removedFollowing = await this.followModel
      .find({ followerId: currentUser.id, followType: FollowType.remove })
      .exec();

    const addedUsers = addedFollowing.map(item => item.followingId);
    const removedUsers = removedFollowing.map(item => item.followingId);

    let result = this.addUserToArr(addedUsers, followingByProjects, allUsers);

    result = this.removeUsersFromArr(removedUsers, result);
    result = this.removeMyselfFromArr(currentUser.id, result);

    return result;
  }

  async getMyRemovedFollowing(userId: string): Promise<FollowEntity[]> {
    return await this.followModel
      .find({ followerId: userId, followType: FollowType.remove })
      .populate('followingId')
      .populate('followerId')
      .exec();
  }

  async getMyAddedFollowing(userId: string): Promise<FollowEntity[]> {
    return await this.followModel
      .find({ followerId: userId, followType: FollowType.add })
      .populate('followingId')
      .populate('followerId')
      .exec();
  }

  async addFollow(data: FollowerModel): Promise<FollowEntity> {
    const newFollow = await this.followModel.create(data);
    return newFollow.save();
  }

  async deleteFollow(id: string): Promise<FollowEntity> {
    return this.followModel.findByIdAndDelete(id);
  }

  async getMyFollowers(currentUserId: string): Promise<UserEntity[]> {

    const allUsers = await this.userService.getUsers();
    const currentUser = await this.userService.getUserById(currentUserId);
    const followersByProjects = this.matchUsersAndActiveProjects(currentUser, allUsers);

    const addedFollowersArr = await this.followModel
      .find({ followingId: currentUser.id, followType: FollowType.add })
      .exec();

    const removedFollowersArr = await this.followModel
      .find({ followingId: currentUser.id, followType: FollowType.remove })
      .exec();

    const addedUsers = addedFollowersArr.map(item => item.followerId);
    const removedUsers = removedFollowersArr.map(item => item.followerId);

    let result = this.addUserToArr(addedUsers, followersByProjects, allUsers);

    result = this.removeUsersFromArr(removedUsers, result);
    result = this.removeMyselfFromArr(currentUser.id, result);

    return result;
  }

  // Добавление пользователя в массив
  // проверяем, если он уже там есть, вернем массив
  // если его там нет, добавим
  private addUserToArr(addedUsers: string[], mainArr: UserEntity[], allUsers: UserEntity[]): UserEntity[] {

    if (addedUsers.length === 0) {
      return mainArr;
    }

    const usersAbsentInMainArr = addedUsers
      .filter(element => !mainArr.some((elem) => element.toString() === elem.id.toString()));

    if (usersAbsentInMainArr.length === 0) {
      return mainArr;
    }

    const userArr = usersAbsentInMainArr.map(item => {
      return allUsers.find(el => {
        return el.id.toString() === item.toString();
      });
    });

    return [...mainArr, ...userArr];
  }

  private removeUsersFromArr(removedUsers: string[], mainArr: UserEntity[]): UserEntity[] {
    if (removedUsers.length === 0) {
      return mainArr;
    }

    return mainArr.filter(user => {
      return !removedUsers.some((el) => {
        return el.toString() === user.id.toString();
      });
    });
  }

  private removeMyselfFromArr(userId: string, arr: UserEntity[]) {
    return arr.filter(el => el.id.toString() !== userId.toString());
  }

  private matchUsersAndActiveProjects(selectedUser: UserEntity, allUsers: UserEntity[]): UserEntity[] {
    return allUsers
      .filter((user) =>
        (user.projects
          .filter((p) => p.project)
          // выбрали проекты, активные на текущий момент
          .filter((p) => this.isActive(p))
          // из активных проектов проверили, есть ли хоть один:
          .some((activeProject) => {

            return selectedUser.projects
              // у выбранного пользователя отфильтровали активные на текущий момент
              .filter(p => this.isActive(p))
              // проверили совпадение активных проектов для проекта у пользователя и активного пользователя
              .some(project => {
                // return project.project.equals(activeProject.project);
                if (project.project && activeProject.project) {
                  return project.project.toString() === activeProject.project.toString();
                }

                return false;
              });
          })));
  }

  private isActive(p): boolean {
    p.dateStart = p.dateStart ? p.dateStart : moment('1900-01-01').format();
    p.dateEnd = p.dateEnd ? p.dateEnd : moment('2100-01-01').format();
    return moment().isBetween(p.dateStart, p.dateEnd);
  }
}
