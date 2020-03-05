import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProjectNewMetadataDto {
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
