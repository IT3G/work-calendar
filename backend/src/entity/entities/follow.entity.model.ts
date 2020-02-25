import { Document } from 'mongoose';
import { UserEntity } from './user.entity.model';

export interface FollowEntity extends Document {
  followerId: UserEntity; // кто подписан
  followingId: UserEntity; // на кого подписан
  followType: FollowType; // тип подписки добавлен или в черном списке )))
}

export enum FollowType {
  add = 'add',
  remove = 'remove'
}
