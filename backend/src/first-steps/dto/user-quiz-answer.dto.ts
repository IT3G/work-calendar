import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { IsObjectId } from '../validators/is-object-id.validator';
import { UserQuizzesAnswerEntity } from '../../entity/entities/user-quizzes.entity';

export class UserQuizAnswerDto {
  @ApiModelProperty()
  @Expose()
  @IsObjectId()
  @Transform((val, src: UserQuizzesAnswerEntity) => src._id)
  id: string;

  @ApiModelProperty()
  @Expose()
  @IsString()
  questionId: string;

  @ApiModelProperty()
  @Expose()
  @IsBoolean()
  value: boolean;
}
