import { JobPositionModel } from '../../shared/models/job-position.model';
import { LocationEnum } from '../../shared/models/location.enum';

export class PresenceFiltersFormModel {
  name: string;
  jobPosition: JobPositionModel;
  project: string;
  location: LocationEnum;
}
