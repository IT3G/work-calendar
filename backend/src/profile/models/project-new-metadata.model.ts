import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProjectNewMetadataModel {
  @Expose()
  @ApiModelProperty()
  month: number;

  @Expose()
  @ApiModelProperty()
  year: number;

  @Expose()
  @ApiModelProperty()
  percent: number;
}
