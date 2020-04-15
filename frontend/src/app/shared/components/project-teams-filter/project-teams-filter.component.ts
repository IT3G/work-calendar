import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { radioButtonGroupCommonColor } from '../../const/subdivision-colors.const';
import { ToggleButtonDataModel } from '../radio-button-group/radio-button-group.model';
import { SelectInputDataModel } from '../single-select/single-select.component';

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
  isMobileVersion: boolean;

  @Input()
  filtersForm: FormGroup;

  @Input()
  subdivision: ToggleButtonDataModel[];

  @Input()
  subdivisions: SelectInputDataModel[];

  @Input()
  hideMonths: boolean;

  public filterInfo = radioButtonGroupCommonColor;
  public date$ = new BehaviorSubject<moment.Moment>(moment());
  public defaultState: string;

  ngOnInit(): void {
    this.defaultState = this.filterInfo[0].value;
    this.filtersForm.patchValue({ subdivision: this.defaultState });
  }

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
