import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { ProjectNewMetadataDto } from './project-new-metadata.dto';

export class ProjectNewDto {
  @Expose()
  @Transform((val, src) => src.project_id.toString())
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
