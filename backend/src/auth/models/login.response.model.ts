import { ApiModelProperty } from '@nestjs/swagger';
import { JobPositionModel } from '../../dictionary/models/job-position.model';
import { SubdivisionModel } from '../../dictionary/models/subdivision.model';
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
  subdivision: SubdivisionModel;
  @ApiModelProperty()
  jobPosition: JobPositionModel;
  @ApiModelProperty()
  authType?: string;
  @ApiModelProperty()
  hashPswd?: string;
}
