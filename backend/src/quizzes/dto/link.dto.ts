import { Expose, Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { LinkEntity } from '../../entity/entities/quiz.entity';
import { IsString } from 'class-validator';

export class LinkDto {
  @Expose()
  @Transform((values, src: LinkEntity) => src._id)
  @IsString()
  @ApiModelProperty()
  id: string;

  @Expose()
  @IsString()
  @ApiModelProperty()
  url: string;

  @Expose()
  @IsString()
  @ApiModelProperty()
  name: string;
}
