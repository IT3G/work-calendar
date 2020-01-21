import { Document } from 'mongoose';

export interface FollowEntity extends Document  {
  followerId: string; // кто подписан
  followingId: string; // на кого подписан
  followType: FollowType; // тип подписки добавлен или в черном списке )))
}

export type FollowType = 'add' | 'remove';
