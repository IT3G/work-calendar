import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { DictionaryDto } from '../../dictionary/dto/dictionary.dto';
import { ProjectNewDto } from './project-new.dto';

export class UserDto {
  @Expose()
  @Transform((val, src) => src.id)
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
  @Type(() => DictionaryDto)
  @ApiModelProperty()
  subdivision: DictionaryDto;

  @Expose()
  @Type(() => DictionaryDto)
  @ApiModelProperty()
  jobPosition: DictionaryDto;

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
