import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsObjectId } from '../validators/is-object-id.validator';
import { QuestionDto } from './question.dto';

export class QuizDto {
  @Expose()
  @Transform((_, src) => src._id)
  @IsObjectId()
  id: string;

  @ApiModelProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiModelProperty({ type: [QuestionDto] })
  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
