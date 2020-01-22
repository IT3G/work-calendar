import { ApiModelProperty } from '@nestjs/swagger';
import { DictionaryModel } from '../../dictionary/models/dictionary.model';

export class AddedProjectModel {
  // @ApiModelProperty({ type: String })
  // _id: string;
  @ApiModelProperty()
  dateStart?: string;
  @ApiModelProperty()
  dateEnd?: string;
  @ApiModelProperty()
  project: DictionaryModel;
}
