import * as moment from 'moment';
import { ProjectStatsMetadataNewModel } from '../models/project-new.model';

export class NewProjectUtils {
  public static mapMetadataToDate(m: ProjectStatsMetadataNewModel): moment.Moment {
    return moment(`${m.month}-${m.year}`, 'M-YYYY');
  }
}
