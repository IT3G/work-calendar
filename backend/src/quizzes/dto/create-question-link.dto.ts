import { Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateQuestionLinkDto {
  @Expose()
  @IsString()
  @ApiModelProperty()
  url: string;

  @Expose()
  @IsString()
  @ApiModelProperty()
  name: string;
}
