import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class HolidaysYearDto {
  @Expose()
  @ApiModelProperty()
  year: string;

  @Expose()
  @ApiModelProperty()
  Jan: string;

  @Expose()
  @ApiModelProperty()
  Feb: string;

  @Expose()
  @ApiModelProperty()
  Mar: string;

  @Expose()
  @ApiModelProperty()
  Apr: string;

  @Expose()
  @ApiModelProperty()
  May: string;

  @Expose()
  @ApiModelProperty()
  June: string;

  @Expose()
  @ApiModelProperty()
  July: string;

  @Expose()
  @ApiModelProperty()
  Aug: string;

  @Expose()
  @ApiModelProperty()
  Sept: string;

  @Expose()
  @ApiModelProperty()
  Oct: string;

  @Expose()
  @ApiModelProperty()
  Nov: string;

  @Expose()
  @ApiModelProperty()
  Dec: string;

  @Expose()
  @ApiModelProperty()
  allDays: string;

  @Expose()
  @ApiModelProperty()
  allWork: string;

  @Expose()
  @ApiModelProperty()
  hours24: string;

  @Expose()
  @ApiModelProperty()
  hours36: string;

  @Expose()
  @ApiModelProperty()
  hours40: string;

  @Expose()
  @ApiModelProperty()
  fileName: string;
}
