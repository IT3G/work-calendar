import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../profile/dto/user.dto';
import { TaskDto } from './task.dto';

export class PresenceDto {
  @Expose()
  @Type(() => UserDto)
  @ApiModelProperty()
  employee: UserDto;

  @Expose()
  @Type(() => TaskDto)
  @ApiModelProperty()
  tasks: TaskDto[];
}
