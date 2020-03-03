import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FollowDto } from './follow.dto';
import { UserDto } from './user.dto';

export class UserFollowDto {
  @Expose()
  @Type(() => UserDto)
  @ApiModelProperty()
  following: UserDto[];

  @Expose()
  @Type(() => UserDto)
  @ApiModelProperty()
  followers: UserDto[];

  @Expose()
  @Type(() => FollowDto)
  @ApiModelProperty()
  allForUser: FollowDto[];
}
