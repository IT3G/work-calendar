import { FollowEntity } from '../../entity/entities/follow.entity.model';
import { UserEntity } from '../../entity/entities/user.entity';

export interface UserFollow {
  following: UserEntity[];
  followers: UserEntity[];
  allForUser: FollowEntity[];
}
