import { ApiModelProperty } from '@nestjs/swagger';

export class LoginRequestModel {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  password: string;
  @ApiModelProperty()
  name?: string;
}
