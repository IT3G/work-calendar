import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { HolidaysYearDto } from './holidays-year.dto';

export class HolidaysDto {
  @Expose()
  @Transform((val, src) => src.id)
  @ApiModelProperty({ type: String })
  _id?: string;

  @Expose()
  @Type(() => HolidaysYearDto)
  @ApiModelProperty()
  data: HolidaysYearDto[];
}
