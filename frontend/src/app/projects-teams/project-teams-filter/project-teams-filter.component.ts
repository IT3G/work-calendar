import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToggleButtonData } from '../../shared/components/radio-button-group/radio-button-group.component';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { RadioButtonGroupCommonColor } from '../../shared/const/subdivision-colors.const';

export interface ProjectTeamsFilterModel {
  month: moment.Moment;
  subdivision: string;
}

@Component({
  selector: 'app-project-teams-filter',
  templateUrl: './project-teams-filter.component.html',
  styleUrls: ['./project-teams-filter.component.scss']
})
export class ProjectTeamsFilterComponent implements OnInit {
  @Input()
  filtersForm: FormGroup;

  @Input()
  subdivision: ToggleButtonData[];

  public filterInfo = RadioButtonGroupCommonColor;
  public date$ = new BehaviorSubject<moment.Moment>(moment());

  constructor() {}

  ngOnInit(): void {}

  public prevMonth(): void {
    const newData = this.date$.value.clone().subtract(1, 'months');
    this.date$.next(newData);
    this.changeData(newData);
  }

  public nextMonth(): void {
    const newData = this.date$.value.clone().add(1, 'months');
    this.date$.next(newData);
    this.changeData(newData);
  }

  public changeSubdivision($event) {
    this.filtersForm.patchValue({ subdivision: $event });
  }

  public changeData(data) {
    this.filtersForm.patchValue({ month: data });
  }
}
