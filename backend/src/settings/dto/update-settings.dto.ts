import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateSettingsDto {
  @Expose()
  @ApiModelProperty()
  logoName: string;

  @Expose()
  @ApiModelProperty()
  title: string;
}
