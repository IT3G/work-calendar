import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { LastProjectModel } from '../../shared/models/last-project.model';
import { PresenceModel } from '../../shared/models/presence.page.model';
import { ProjectNewModel } from '../../shared/models/project-new.model';
import { NewProjectUtils } from '../../shared/utils/new-project.utils';
import { PresenceFiltersFormModel } from '../models/presence-filters-form.model';
@Pipe({
  name: 'presenceFilter'
})
export class PresenceFilterPipe implements PipeTransform {
  transform(value: PresenceModel[], filter: PresenceFiltersFormModel, date: Moment): PresenceModel[] {
    if (!value) {
      return [];
    }

    if (!filter) {
      return value;
    }

    let res: PresenceModel[] = [...value];

    if (filter.name) {
      res = res.filter(
        i => i.employee.username && i.employee.username.toLowerCase().includes(filter.name.toLowerCase())
      );
    }

    if (filter.location) {
      res = res.filter(
        i => i.employee.location && i.employee.location.toLowerCase() === filter.location.toLocaleLowerCase()
      );
    }

    if (filter.jobPosition) {
      res = res.filter(i => i.employee.jobPosition && i.employee.jobPosition.name === filter.jobPosition);
    }

    if (filter.subdivision) {
      res = res.filter(i => i.employee.subdivision && i.employee.subdivision.name === filter.subdivision);
    }

    if (filter.project) {
      res = res.filter(p => {
        if (!p.employee) {
          return false;
        }

        const isSameProjectInMonth = this.isSomeProjectAtMonth(p.employee.projectsNew, date, filter.project);
        const isSameLastProjectInMonth = this.isSameLastProjectAtMonth(p.employee.lastProjects, date, filter.project);

        return isSameProjectInMonth || isSameLastProjectInMonth;
      });
    }
    return res.filter(p => date.isSameOrAfter(moment(p.employee.whenCreated), 'month'));
  }

  private isSomeProjectAtMonth(projects: ProjectNewModel[], date: Moment, selectedProject: string): boolean {
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

  /** Проверяем входит ли последний проект в число выбранных, чтоб можно было отображать людей в будущем по последним проектам */
  private isSameLastProjectAtMonth(projects: LastProjectModel[], date: Moment, selectedProject: string): boolean {
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
}
