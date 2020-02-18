import { ApiModelProperty } from '@nestjs/swagger';
import { DictionaryModel } from '../../dictionary/models/dictionary.model';
import { AddedProjectModel } from './added-project.model';

export class UserModel {
  @ApiModelProperty()
  _id: string;
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  location: string;
  @ApiModelProperty()
  position: string;
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
