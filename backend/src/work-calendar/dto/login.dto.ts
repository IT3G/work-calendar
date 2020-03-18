import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserDto } from '../../profile/dto/user.dto';

export class LoginDto {
  @Expose()
  @ApiModelProperty()
  refreshToken: string;

  @Expose()
  @ApiModelProperty()
  accessKey: string;

  @Expose()
  @ApiModelProperty()
  user: UserDto;
}
