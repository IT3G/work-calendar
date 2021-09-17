import { Expose, Transform, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { LinkDto } from './link.dto';
import { QuestionEntity } from '../../entity/entities/quiz.entity';

export class QuestionDto {
  @Expose()
  @Transform((value, src: QuestionEntity) => src._id)
  @ApiModelProperty()
  id: string;

  @Expose()
  @ApiModelProperty()
  imageUrl?: string;

  @Expose()
  @ApiModelProperty()
  description: string;

  @Expose()
  @Type(() => LinkDto)
  @ApiModelProperty({ type: [LinkDto] })
  links?: LinkDto[];

  createdAt?: string | boolean;

  updatedAt?: string | boolean;
}
