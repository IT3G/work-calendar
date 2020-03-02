import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DictionaryModel {
  @Expose()
  @ApiModelProperty({ type: String })
  _id?: string;

  @Expose()
  @ApiModelProperty({ type: String })
  name: string;
}
