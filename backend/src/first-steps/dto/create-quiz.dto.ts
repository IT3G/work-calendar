import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateQuizQuestionDto } from './create-quiz-question.dto';

export class CreateQuizDto {
  @ApiModelProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty({ type: [CreateQuizQuestionDto] })
  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateQuizQuestionDto)
  questions: CreateQuizQuestionDto[];
}
