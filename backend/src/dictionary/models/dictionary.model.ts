import { ApiModelProperty } from '@nestjs/swagger';

export class DictionaryModel {
  @ApiModelProperty({ type: String })
  name: string;
}
