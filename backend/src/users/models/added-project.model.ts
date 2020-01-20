import { ApiModelProperty } from '@nestjs/swagger';

export class AddedProjectModel {
  @ApiModelProperty({ type: String })
  _id: string;
  @ApiModelProperty()
  dateStart?: string;
  @ApiModelProperty()
  dateEnd?: string;
  @ApiModelProperty()
  project: string;
}
