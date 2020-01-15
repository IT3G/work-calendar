import { ApiModelProperty } from '@nestjs/swagger';

export class FollowerModel {
  @ApiModelProperty()
  followerId: string;
  @ApiModelProperty()
  followingId: string;
  @ApiModelProperty()
  projectId: string;
}
