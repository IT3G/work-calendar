import { QuestionDto } from './question.dto';
import { Expose, Transform, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { QuizEntity } from '../../entity/entities/quiz.entity';

export class QuizDto {
  @Expose()
  @Transform((value, src: QuizEntity) => src._id)
  @ApiModelProperty()
  id: string;

  @Expose()
  @ApiModelProperty()
  name: string;

  @Expose()
  @Type(() => QuestionDto)
  @ApiModelProperty({ type: [QuestionDto] })
  questions: QuestionDto[];

  @Expose()
  @ApiModelProperty({ type: 'string', format: 'date-time' })
  createdAt?: boolean | string;

  @Expose()
  @ApiModelProperty({ type: 'string', format: 'date-time' })
  updatedAt?: boolean | string;
}
