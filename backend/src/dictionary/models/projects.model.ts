import { ApiModelProperty } from '@nestjs/swagger';

export class ProjectModel {
  @ApiModelProperty({ type: String })
  title: string;
}
