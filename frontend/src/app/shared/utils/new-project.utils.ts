import * as moment from 'moment';
import { Employee } from '../models/employee.model';
import { LastProjectModel } from '../models/last-project.model';
import { ProjectNewModel, ProjectStatsMetadataNewModel } from '../models/project-new.model';

export class NewProjectUtils {
  public static mapMetadataToDate(m: ProjectStatsMetadataNewModel): moment.Moment {
    return moment(`${m.month}-${m.year}`, 'M-YYYY');
  }

  /**
   * Проверяет входит-ли проект в число проектов пользователя в этом месяце
   */
  public static isSomeProjectAtMonth(
    projects: ProjectNewModel[],
    date: moment.Moment,
    selectedProject: string
  ): boolean {
    if (!projects) {
      return false;
    }

    return projects.some(p => {
      if (p.project_id !== selectedProject) {
        return false;
      }

      return p.metadata.some(m => NewProjectUtils.mapMetadataToDate(m).isSame(date, 'month'));
    });
  }

  /**
   * Проверяет входит-ли текущий проект в число последних проектов пользователя.
   */
  public static isSameLastProjectAtMonth(
    projects: LastProjectModel[],
    date: moment.Moment,
    selectedProject: string
  ): boolean {
    if (!projects) {
      return false;
    }

    return projects.some(p => {
      if (p.project_id !== selectedProject) {
        return false;
      }

      const { project_id, project_name, ...metadata } = p;

      return NewProjectUtils.mapMetadataToDate(metadata).isBefore(date, 'month');
    });
  }

  public static isUserHaveSameOrLastProjectInCurrentMonth(employee: Employee, date: moment.Moment, projectId: string) {
    const isSameProjectInMonth = this.isSomeProjectAtMonth(employee.projectsNew, date, projectId);
    const isSameLastProjectInMonth = this.isSameLastProjectAtMonth(employee.lastProjects, date, projectId);

    return isSameProjectInMonth || isSameLastProjectInMonth;
  }
}
