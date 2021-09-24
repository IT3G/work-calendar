import { IsObjectId } from '../validators/is-object-id.validator';
import { IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiModelProperty()
  quizName: string;

  @ApiModelProperty()
  @IsObjectId()
  questionId: string;

  @ApiModelProperty()
  @IsBoolean()
  check: boolean;
}
