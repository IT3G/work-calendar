import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { SelectInputDataModel } from 'src/app/shared/components/single-select/single-select.component';

export interface TeamsFilterModel {
  month: moment.Moment;
  name: string;
  project: string;
  location: string;
}

@Component({
  selector: 'app-teams-filters',
  templateUrl: './teams-filters.component.html',
  styleUrls: ['./teams-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsFiltersComponent {
  @Input()
  filtersForm: FormGroup;

  @Input()
  projects: SelectInputDataModel[];

  @Input()
  jobPositions: SelectInputDataModel[];

  @Input()
  subdivisions: SelectInputDataModel[];

  @Input()
  projectOffices: SelectInputDataModel[];

  @Input()
  locations: SelectInputDataModel[];

  public date$ = new BehaviorSubject<moment.Moment>(moment());

  /** предыдущий месяц */
  public prevMonth(): void {
    const newData = this.date$.value.clone().subtract(1, 'months');
    this.date$.next(newData);
    this.changeData(newData);
  }

  /** следующий месяц */
  public nextMonth(): void {
    const newData = this.date$.value.clone().add(1, 'months');
    this.date$.next(newData);
    this.changeData(newData);
  }

  /** пропатчить месяц */
  public changeData(data) {
    this.filtersForm.patchValue({ month: data });
  }
}
