import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class SkillsDto {
  @Expose()
  @Transform((val, src) => src.id)
  @ApiModelProperty()
  _id: string;

  @Expose()
  @ApiModelProperty()
  logoName: string;

  @Expose()
  @ApiModelProperty()
  name: string;

  @Expose()
  @ApiModelProperty()
  hint: string;
}
