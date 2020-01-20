import { ApiModelProperty } from '@nestjs/swagger';

export class FollowerModel {
  @ApiModelProperty()
  _id?: string;
  @ApiModelProperty()
  followerId: string; // тот, кто следит
  @ApiModelProperty()
  followingId: string; // тот, за кем следят
  @ApiModelProperty()
  projectId: string;
}
