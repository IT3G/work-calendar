export class ProjectNew {
  project_id: string;
  project_name: string;
  metadata: ProjectStatsMetadataNew[];
}

export class ProjectStatsMetadataNew {
  month: number;
  year: number;
  percent: number;
}
