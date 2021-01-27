import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PresenseRequestDto {
  @Expose()
  @ApiModelProperty()
  date: string;

  @Expose()
  @ApiModelProperty()
  name: string;

  @Expose()
  @ApiModelProperty()
  type: string;
}
