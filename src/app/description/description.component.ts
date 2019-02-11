import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Observable } from 'rxjs';
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
  form: FormGroup;
  options: any[];
  tasks$: Observable<TasksModel[]>;
  optionControl = new FormControl(null);

  public tasks: any[];
  constructor(
    private datesStoreService: DatesStoreService,
    private dateConvertService: DateConvertService,
    private crudService: CrudService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      type: [null, [Validators.required]],
      comment: []
    });
    this.getInfoFromStore();
    this.options = AgendaColors;
  }

  public addTask(): void {
    if (this.form.invalid) {
      alert('Заполните форму');
      return;
    }

    const val = this.form.value;

    const object = {
      id: val.type.id,
      dateStart: moment(val.dateStart),
      dateEnd: moment(val.dateEnd)
    };

    console.log(this.form.value);

    this.crudService.addTask(object).then(() => {});
  }

  public changeDateStart(date: NgbDateStruct): void {
    this.datesStoreService.setDateStart(this.dateConvertService.convertNgbDateToMoment(date));
  }

  public changeDateEnd(date: NgbDateStruct): void {
    this.datesStoreService.setDateEnd(this.dateConvertService.convertNgbDateToMoment(date));
  }

  private getInfoFromStore() {
    this.tasks$ = this.datesStoreService.getTasks();
  }
}
