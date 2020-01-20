import { Employee } from './employee.model';

export interface FollowModel {
  _id?: string;
  followerId: string | Employee;
  followingId: string | Employee;
  followType: FollowType;
}

export type FollowType = 'add' | 'remove';
