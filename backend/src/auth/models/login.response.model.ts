import { ApiModelProperty } from '@nestjs/swagger';
import { JobPositionModel } from './job-position.response.model';

import { Document } from 'mongoose';

export class LoginResponseModel {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  location: string;
  @ApiModelProperty()
  position: string;
  @ApiModelProperty()
  projects: string[];
  @ApiModelProperty()
  whenCreated: string;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  telNumber: string;
  @ApiModelProperty()
  physicalDeliveryOfficeName: string;
  @ApiModelProperty()
  mailNickname: string;
  @ApiModelProperty()
  isAdmin: boolean;
  @ApiModelProperty()
  hasMailing: boolean;
  @ApiModelProperty()
  subdivision: string;
  @ApiModelProperty()
  jobPosition: JobPositionModel;
}
