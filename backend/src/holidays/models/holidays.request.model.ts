import { ApiModelProperty } from '@nestjs/swagger';
import { HolidaysYearResponseModel } from './holidays-year.request.model';

export class HolidaysResponseModel {
  @ApiModelProperty({ type: String })
  _id?: string;
  @ApiModelProperty()
  data: HolidaysYearResponseModel[];
}
