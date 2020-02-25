import { ApiModelProperty } from '@nestjs/swagger';
import { FollowType } from '../../entity/entities/follow.entity.model';
import { UserModel } from './user.model';

export class FollowerModel {
  @ApiModelProperty()
  _id?: string;
  @ApiModelProperty()
  followerId: UserModel; // тот, кто следит
  @ApiModelProperty()
  followingId: UserModel; // тот, за кем следят
  @ApiModelProperty()
  followType: FollowType;
}
