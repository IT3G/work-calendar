import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class DictionaryDto {
  @Expose()
  @Transform((val, src) => src.id)
  @ApiModelProperty({ type: String })
  _id: string;

  @Expose()
  @ApiModelProperty({ type: String })
  name: string;
}
