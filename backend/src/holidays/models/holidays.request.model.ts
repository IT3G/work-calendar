import { ApiModelProperty } from '@nestjs/swagger';

export class HolidaysResponseModel {
  @ApiModelProperty()
  year: string;
  @ApiModelProperty()
  data: string;
}
