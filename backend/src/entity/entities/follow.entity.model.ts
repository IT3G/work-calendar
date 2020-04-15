import { Document } from 'mongoose';

export interface FollowEntity extends Document {
  followerId: String; // кто подписан
  followingId: String; // на кого подписан
  followType: FollowType; // тип подписки добавлен или в черном списке )))
}

export enum FollowType {
  add = 'add',
  remove = 'remove'
}
