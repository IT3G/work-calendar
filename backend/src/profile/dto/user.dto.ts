import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { DictionaryModel } from '../../dictionary/models/dictionary.model';
import { ProjectNewDto } from './project-new.dto';

export class UserDto {
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
  @Type(() => ProjectNewDto)
  @ApiModelProperty()
  projectsNew: ProjectNewDto[];

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
