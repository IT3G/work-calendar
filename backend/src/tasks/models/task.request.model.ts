import { ApiModelProperty } from "@nestjs/swagger";

export class TaskResponseModel {
  @ApiModelProperty()
  comment: string;
  @ApiModelProperty()
  dateEnd: string;
  @ApiModelProperty()
  dateStart: string;
  @ApiModelProperty()
  dtCreated: string;
  @ApiModelProperty()
  employee: string;
  @ApiModelProperty()
  type: string;
  @ApiModelProperty()
  employeeCreated: string;
}
