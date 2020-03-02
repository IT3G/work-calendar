import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DayType } from '../../const/day-type.const';
import { TaskModel } from '../../models/tasks.model';
import { DateConvertService } from '../../services/date-convert.service';
import { DayTypeGetterService } from '../../services/day-type-getter.service';
import { TaskApprovedGetterService } from '../../services/task-approved-getter.service';

@Pipe({
  name: 'transformTaskType'
})
export class TransformTaskTypePipe implements PipeTransform {
  constructor(
    private dateConvertService: DateConvertService,
    private dayTypeGetterService: DayTypeGetterService,
    private taskApprovedGetterService: TaskApprovedGetterService
  ) {}

  transform(date: NgbDateStruct, tasks: TaskModel[]): string {
    if (!date) {
      return `type_COMMON`;
    }

    const dtMoment = this.dateConvertService.convertNgbDateToMoment(date);
    const dayType = DayType[this.dayTypeGetterService.getDayType(dtMoment, tasks)];
    const isApproved = this.taskApprovedGetterService.getTaskApproval(dtMoment, tasks);

    if (!dayType) {
      return `type_COMMON`;
    }

    const dayClass = `type_${dayType}`;
    return isApproved ? `${dayClass} is-approved` : dayClass;
  }
}
