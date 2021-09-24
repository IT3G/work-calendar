import { Expose, Transform } from 'class-transformer';
import { IsObjectId } from '../validators/is-object-id.validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LinkDto {
  @Transform((_, src) => src._id)
  @IsObjectId()
  id: string;

  @ApiModelProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiModelProperty()
  @Expose()
  @IsString()
  url: string;
}
