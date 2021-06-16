import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { DictionaryDto } from '../../dictionary/dto/dictionary.dto';

export class UserBirthdayDto {
  @Exclude()
  @ApiModelProperty()
  _id: string;

  @Expose()
  @ApiModelProperty()
  username: string;

  @Expose()
  @ApiModelProperty()
  mailNickname: string;

  @Expose()
  @ApiModelProperty()
  birthday: string;

  @Expose()
  @ApiModelProperty()
  email: string;

  @Expose()
  @ApiModelProperty()
  location: string;

  @Exclude()
  month: number;

  @Expose()
  @Transform(val => val?.name)
  @ApiModelProperty()
  subdivision: DictionaryDto;

  @Expose()
  @Transform(val => val?.name)
  @ApiModelProperty()
  jobPosition: DictionaryDto;
}
