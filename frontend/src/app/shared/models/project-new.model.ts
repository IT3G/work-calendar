export class ProjectNewModel {
  project_id: string;
  project_name: string;
  metadata: ProjectStatsMetadataNewModel[];
}

export class ProjectStatsMetadataNewModel {
  month: number;
  year: number;
  percent: number;
}
