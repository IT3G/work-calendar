import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateQuizQuestionLinkDto {
  @ApiModelProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiModelProperty()
  @Expose()
  @IsString()
  url: string;
}
