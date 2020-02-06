import { ProjectNewMetadataEntity } from './project-new-metadata.entity';

export class ProjectNewEntity {
  project_id: string;
  project_name: string;
  metadata: ProjectNewMetadataEntity[];
}
