import { LocationEnum } from '../../shared/models/location.enum';

export class PresenceFiltersFormModel {
  name: string;
  jobPosition: string;
  subdivision: string;
  project: string;
  location: LocationEnum;
}
