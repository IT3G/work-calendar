import { LocationEnum } from '../../shared/models/location.enum';

export class PresenceFiltersFormModel {
  name: string;
  jobPosition: string;
  project: string;
  location: LocationEnum;
}
