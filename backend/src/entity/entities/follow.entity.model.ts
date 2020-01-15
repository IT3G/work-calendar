import { Document } from 'mongoose';

export interface FollowEntity extends Document  {
  followerId: string; // кто подписан
  followingId: string; // на кого подписан
  projectId: string; // проект в рамках которого
}

// Получаешь за кем ты следишь по FolowerEntity.folowerId
// Получаешь тех кто следит за тобой FolowerEntity.folowingId
// дата просрочена - при отображении вкладки подписка сносить просроченные
// уведомление - все, кто без проекта (сам добавил меня), и все кто на эту дату на меня подписан (фильтр по проекту)
