import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class LastProjectDto {
  @Expose()
  @Transform((val, src) => src.project_id.toString())
  @ApiModelProperty()
  project_id: string;

  @Expose()
  @ApiModelProperty()
  project_name: string;

  @Expose()
  @ApiModelProperty()
  percent: number;

  @Expose()
  @ApiModelProperty()
  month: number;

  @Expose()
  @ApiModelProperty()
  year: number;
}
