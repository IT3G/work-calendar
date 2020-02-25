import { ApiModelProperty } from '@nestjs/swagger';

export class TaskModel {
  @ApiModelProperty()
  _id: string;
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
  approved: boolean;
  @ApiModelProperty()
  attachment: {
    fileName: string;
    originalName: string;
  };
  @ApiModelProperty()
  employeeCreated: string;
}
