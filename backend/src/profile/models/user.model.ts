import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { DictionaryModel } from '../../dictionary/models/dictionary.model';
import { ProjectNewModel } from './project-new.model';

export class UserModel {
  @Expose()
  @ApiModelProperty()
  _id: string;

  @Expose()
  @ApiModelProperty()
  username: string;

  @Expose()
  @ApiModelProperty()
  patronymic: string;

  @Expose()
  @ApiModelProperty()
  location: string;

  @Expose()
  @ApiModelProperty()
  position: string;

  @Expose()
  @ApiModelProperty()
  whenCreated: string;

  @Expose()
  @ApiModelProperty()
  email: string;

  @Expose()
  @ApiModelProperty()
  telNumber: string;

  @Expose()
  @ApiModelProperty()
  skype: string;

  @Expose()
  @ApiModelProperty()
  telegram: string;

  @Expose()
  @ApiModelProperty()
  physicalDeliveryOfficeName: string;

  @Expose()
  @ApiModelProperty()
  mailNickname: string;

  @Expose()
  @ApiModelProperty()
  isAdmin: boolean;

  @Expose()
  @ApiModelProperty()
  hasMailing: boolean;

  @Expose()
  @Type(() => DictionaryModel)
  @ApiModelProperty()
  subdivision: DictionaryModel;

  @Expose()
  @Type(() => DictionaryModel)
  @ApiModelProperty()
  jobPosition: DictionaryModel;

  @Expose()
  @Type(() => ProjectNewModel)
  @ApiModelProperty()
  projectsNew: ProjectNewModel[];

  @Expose()
  @ApiModelProperty()
  authType: string;

  @Expose()
  @ApiModelProperty()
  hashPassword: string;

  @Expose()
  @ApiModelProperty()
  terminationDate: string;
}
