import { ApiModelProperty } from '@nestjs/swagger';

export class SendMailRequestModel {
  @ApiModelProperty()
  adress: string[];
  @ApiModelProperty()
  author: string;
  @ApiModelProperty()
  date: string;
  @ApiModelProperty()
  user: string;
  @ApiModelProperty()
  status: string;
  @ApiModelProperty()
  comment: string;
  @ApiModelProperty()
  dateEnd: string;
}
