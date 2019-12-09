import { ApiModelProperty } from '@nestjs/swagger';
import { DictionaryModel } from '../../dictionary/models/dictionary.model';
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
  subdivision: DictionaryModel;
  @ApiModelProperty()
  jobPosition: DictionaryModel;
  @ApiModelProperty()
  authType?: string;
  @ApiModelProperty()
  hashPswd?: string;
}
