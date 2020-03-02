import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProjectNewMetadataDto } from './project-new-metadata.dto';

export class ProjectNewDto {
  @Expose()
  @ApiModelProperty()
  project_id: string;

  @Expose()
  @ApiModelProperty()
  project_name: string;

  @Expose()
  @ApiModelProperty()
  @Type(() => ProjectNewMetadataDto)
  metadata: ProjectNewMetadataDto[];
}
