import { ApiModelProperty } from '@nestjs/swagger';

export class JobPositionModel {
  @ApiModelProperty({ type: String })
  name: string;
}
