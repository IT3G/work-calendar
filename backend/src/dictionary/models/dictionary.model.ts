import { ApiModelProperty } from '@nestjs/swagger';

export class DictionaryModel {
  @ApiModelProperty({ type: String })
  _id?: string;
  @ApiModelProperty({ type: String })
  name: string;
}
