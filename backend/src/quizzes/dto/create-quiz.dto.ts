import { CreateQuizQuestionDto } from './create-quiz-question.dto';
import { Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateQuizDto {
  @Expose()
  @IsString()
  @ApiModelProperty()
  name: string;

  @Expose()
  @IsArray()
  @Type(() => CreateQuizQuestionDto)
  @ApiModelProperty({ type: [CreateQuizQuestionDto] })
  questions: CreateQuizQuestionDto[];
}
