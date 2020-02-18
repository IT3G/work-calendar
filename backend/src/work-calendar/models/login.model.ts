import { ApiModelProperty } from '@nestjs/swagger';

export class LoginModel {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  password: string;
  @ApiModelProperty()
  name?: string;
}
