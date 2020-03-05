import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { AttachmentDto } from './attachment.dto';

export class TaskDto {
  @Expose()
  @Transform((val, src) => src.id)
  @ApiModelProperty()
  _id: string;

  @Expose()
  @ApiModelProperty()
  comment: string;

  @Expose()
  @ApiModelProperty()
  dateEnd: string;

  @Expose()
  @ApiModelProperty()
  dateStart: string;

  @Expose()
  @ApiModelProperty()
  dtCreated: string;

  @Expose()
  @ApiModelProperty()
  employee: string;

  @Expose()
  @ApiModelProperty()
  type: string;

  @Expose()
  @ApiModelProperty()
  approved: boolean;

  @Expose()
  @Type(() => AttachmentDto)
  @ApiModelProperty()
  attachment: AttachmentDto;

  @Expose()
  @ApiModelProperty()
  employeeCreated: string;
}
