import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateQuizQuestionLinkDto } from './create-quiz-question-link.dto';

export class CreateQuizQuestionDto {
  @ApiModelProperty()
  @Expose()
  image: string;

  @ApiModelProperty()
  @Expose()
  text: string;

  @ApiModelProperty({ type: [CreateQuizQuestionLinkDto] })
  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateQuizQuestionLinkDto)
  links: CreateQuizQuestionLinkDto[];
}
