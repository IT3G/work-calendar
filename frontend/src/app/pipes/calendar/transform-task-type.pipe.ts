import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DayType } from 'src/app/const/day-type.const';
import { TaskModel } from 'src/app/models/tasks.models';
import { DateConvertService } from 'src/app/services/date-convert.service';
import { DayTypeGetterService } from 'src/app/services/day-type-getter.service';

@Pipe({
  name: 'transformTaskType'
})
export class TransformTaskTypePipe implements PipeTransform {
  constructor(private dateConvertService: DateConvertService, private dayTypeGetterService: DayTypeGetterService) {}

  transform(date: NgbDateStruct, tasks: TaskModel[]): string {
    if (!date) return `type_COMMON`;
    const dtMoment = this.dateConvertService.convertNgbDateToMoment(date);
    const dayType = DayType[this.dayTypeGetterService.getDayType(dtMoment, tasks)];
    return `type_${dayType}`;
  }
}
