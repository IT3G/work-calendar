import { ApiModelProperty } from '@nestjs/swagger';
import { FollowType } from '../../entity/entities/follow.entity.model';
import { UserDto } from '../dto/user.dto';

export class FollowerModel {
  @ApiModelProperty()
  _id?: string;
  @ApiModelProperty()
  followerId: UserDto; // тот, кто следит
  @ApiModelProperty()
  followingId: UserDto; // тот, за кем следят
  @ApiModelProperty()
  followType: FollowType;
}
