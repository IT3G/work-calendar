import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AttachmentDto {
  @Expose()
  @ApiModelProperty()
  fileName: string;

  @Expose()
  @ApiModelProperty()
  originalName: string;
}
