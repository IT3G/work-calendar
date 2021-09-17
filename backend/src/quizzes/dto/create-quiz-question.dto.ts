import { Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateQuestionLinkDto } from './create-question-link.dto';

export class CreateQuizQuestionDto {
  @Expose()
  @IsString()
  @ApiModelProperty()
  imageUrl: string;

  @Expose()
  @IsString()
  @ApiModelProperty()
  description: string;

  @Expose()
  @IsArray()
  @Type(() => CreateQuestionLinkDto)
  @ApiModelProperty({ type: [CreateQuestionLinkDto] })
  links: CreateQuestionLinkDto[];
}
