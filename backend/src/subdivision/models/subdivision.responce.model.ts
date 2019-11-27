import { ApiModelProperty } from '@nestjs/swagger';

export class SubdivisionModel {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  title: string;
}
