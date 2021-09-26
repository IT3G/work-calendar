import { Expose, Transform, Type } from 'class-transformer';
import { IsObjectId } from '../validators/is-object-id.validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { LinkDto } from './link.dto';

export class QuestionDto {
  @ApiModelProperty()
  @Expose()
  @Transform((_, src) => src._id)
  @IsObjectId()
  id: string;

  @ApiModelProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiModelProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiModelProperty({ type: [LinkDto] })
  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => LinkDto)
  links: LinkDto[];
}
