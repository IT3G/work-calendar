import { ApiModelProperty } from '@nestjs/swagger';
import { DictionaryDto } from '../../dictionary/dto/dictionary.dto';

export class AddedProjectModel {
  @ApiModelProperty({ type: String })
  _id: string;
  @ApiModelProperty()
  dateStart?: string;
  @ApiModelProperty()
  dateEnd?: string;
  @ApiModelProperty()
  project: DictionaryDto;
}
