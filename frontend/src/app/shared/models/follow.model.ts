import { Employee } from './employee.model';

export interface UserFollow {
  following: Employee[];
  followers: Employee[];
  allForUser: FollowModel[];
}

export interface FollowModel {
  _id?: string;
  followerId: Employee;
  followingId: Employee;
  followType: FollowType;
}

export type FollowType = 'add' | 'remove';
