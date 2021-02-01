import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PresenceRequestDto {
  @Expose()
  @ApiModelProperty()
  date: string;

  @Expose()
  @ApiModelProperty()
  email: string;

  @Expose()
  @ApiModelProperty()
  type: string;
}
