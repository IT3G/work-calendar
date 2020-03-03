import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { FollowType } from '../../entity/entities/follow.entity.model';
import { UserDto } from '../dto/user.dto';

export class FollowDto {
  @Expose()
  @Transform((val, src) => src.id)
  @ApiModelProperty()
  _id?: string;

  @Expose()
  @Type(() => UserDto)
  @ApiModelProperty()
  followerId: UserDto; // тот, кто следит

  @Expose()
  @Type(() => UserDto)
  @ApiModelProperty()
  followingId: UserDto; // тот, за кем следят

  @Expose()
  @ApiModelProperty()
  followType: FollowType;
}
