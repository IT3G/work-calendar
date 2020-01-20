import { ApiModelProperty } from '@nestjs/swagger';
import { FollowType } from '../../entity/entities/follow.entity.model';

export class FollowerModel {
  @ApiModelProperty()
  _id?: string;
  @ApiModelProperty()
  followerId: string; // тот, кто следит
  @ApiModelProperty()
  followingId: string; // тот, за кем следят
  @ApiModelProperty()
  followType: FollowType;
}
