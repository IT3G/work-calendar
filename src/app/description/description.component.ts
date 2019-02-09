import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TasksModel } from 'src/app/models/tasks.models';
import { AgendaColors } from 'src/app/shared/const/agenda-colors.const';
import { DateConvertService } from 'src/app/shared/services/date-convert.service';
import { DatesStoreService } from 'src/app/store/dates-store.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  dateStart$: Observable<Moment>;
  dateEnd$: Observable<Moment>;
  dateStart: NgbDateStruct;
  dateEnd: NgbDateStruct;
  options: any[];
  tasks$: Observable<TasksModel[]>;
  optionControl = new FormControl(null);
  constructor(private datesStoreService: DatesStoreService, private dateConvertService: DateConvertService) {}

  ngOnInit() {
    this.optionControl.valueChanges.subscribe(res => console.log(res));
    this.getInfoFromStore();
    this.options = AgendaColors;
  }

  public addTask(): void {
    if (!this.optionControl.value.id) {
      alert('Заполните Вид');
      return;
    }
    this.datesStoreService.addTask({
      id: this.optionControl.value.id,
      dateStart: this.dateConvertService.convertNgbDateToMoment(this.dateStart),
      dateEnd: this.dateEnd ? this.dateConvertService.convertNgbDateToMoment(this.dateEnd) : null
    });
    console.log(this.dateStart, this.dateEnd);
  }

  public changeDateStart(date: NgbDateStruct): void {
    this.datesStoreService.setDateStart(this.dateConvertService.convertNgbDateToMoment(date));
  }

  public changeDateEnd(date: NgbDateStruct): void {
    this.datesStoreService.setDateEnd(this.dateConvertService.convertNgbDateToMoment(date));
  }

  private getInfoFromStore() {
    this.datesStoreService
      .getDateStart()
      .pipe(filter(i => !!i))
      .subscribe(res => {
        this.dateStart = this.dateConvertService.convertMomentToNgbDate(res);
      });
    this.datesStoreService
      .getDateEnd()
      .pipe(filter(i => !!i))
      .subscribe(res => {
        this.dateEnd = this.dateConvertService.convertMomentToNgbDate(res);
      });

    this.tasks$ = this.datesStoreService.getTasks();
  }
}
