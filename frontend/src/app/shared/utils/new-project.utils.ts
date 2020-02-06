import { ProjectStatsMetadataNew } from '../models/project-new';
import * as moment from 'moment';

export class NewProjectUtils {
  public static mapMetadataToDate(m: ProjectStatsMetadataNew): moment.Moment {
    return moment(`${m.month}-${m.year}`, 'M-YYYY');
  }
}
