import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProjectNewMetadataModel } from './project-new-metadata.model';

export class ProjectNewModel {
  @Expose()
  @ApiModelProperty()
  project_id: string;

  @Expose()
  @ApiModelProperty()
  project_name: string;

  @Expose()
  @ApiModelProperty()
  @Type(() => ProjectNewMetadataModel)
  metadata: ProjectNewMetadataModel[];
}
