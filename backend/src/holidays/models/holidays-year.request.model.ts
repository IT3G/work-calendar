import { ApiModelProperty } from '@nestjs/swagger';

export class HolidaysYearResponseModel {
  @ApiModelProperty()
  year: string;
  @ApiModelProperty()
  Jan: string;
  @ApiModelProperty()
  Feb: string;
  @ApiModelProperty()
  Mar: string;
  @ApiModelProperty()
  Apr: string;
  @ApiModelProperty()
  May: string;
  @ApiModelProperty()
  June: string;
  @ApiModelProperty()
  July: string;
  @ApiModelProperty()
  Aug: string;
  @ApiModelProperty()
  Sept: string;
  @ApiModelProperty()
  Oct: string;
  @ApiModelProperty()
  Nov: string;
  @ApiModelProperty()
  Dec: string;
  @ApiModelProperty()
  allDays: string;
  @ApiModelProperty()
  allWork: string;
  @ApiModelProperty()
  hours24: string;
  @ApiModelProperty()
  hours36: string;
  @ApiModelProperty()
  hours40: string;
  @ApiModelProperty()
  fileName: string;
}
