import { ApiModelProperty } from '@nestjs/swagger';

export class SubdivisionModel {
  @ApiModelProperty({ type: String })
  name: string;
}
