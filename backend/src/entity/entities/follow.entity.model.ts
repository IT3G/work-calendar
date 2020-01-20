import { Document } from 'mongoose';

export interface FollowEntity extends Document  {
  followerId: string; // кто подписан
  followingId: string; // на кого подписан
  followType: FollowType; // тип подписки добавлен или удален навсегда )))
}

export type FollowType = 'add' | 'remove';
