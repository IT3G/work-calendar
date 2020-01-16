import { ApiModelProperty } from '@nestjs/swagger';
import { DictionaryModel } from '../../dictionary/models/dictionary.model';

export class UserModel {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  location: string;
  @ApiModelProperty()
  position: string;
  @ApiModelProperty()
  projects: Array<{
    _id: string;
    dateStart: string;
    dateEnd: string;
    project: string;
  }>;
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
  hashPassword?: string;
}
