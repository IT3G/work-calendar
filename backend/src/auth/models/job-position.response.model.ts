import { ApiModelProperty } from '@nestjs/swagger';

export class JobPositionModel {
  @ApiModelProperty()
  name: string;
}
