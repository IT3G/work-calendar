import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserQuizAnswerDto } from './user-quiz-answer.dto';
import { IsObjectId } from '../validators/is-object-id.validator';
import { UserQuizzesEntity } from '../../entity/entities/user-quizzes.entity';

export class UserQuizDto {
  @ApiModelProperty()
  @Expose()
  @Transform((val, src: UserQuizzesEntity) => src._id)
  @IsObjectId()
  id: string;

  @ApiModelProperty()
  @Expose()
  @IsString()
  userId: string;

  @ApiModelProperty()
  @Expose()
  @IsString()
  quizId: string;

  @ApiModelProperty({ type: [UserQuizAnswerDto] })
  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => UserQuizAnswerDto)
  answers: UserQuizAnswerDto[];
}
