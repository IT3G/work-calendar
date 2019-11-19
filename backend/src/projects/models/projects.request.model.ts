import { ApiModelProperty } from "@nestjs/swagger";

export class ProjectModel {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  title: string;
}
