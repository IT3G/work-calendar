import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TasksModel } from 'src/app/models/tasks.models';
import { AgendaColors } from 'src/app/shared/const/agenda-colors.const';
import { CrudService } from 'src/app/shared/services/crud.service';
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
  displayedColumns: string[] = ['dateStart', 'id', 'timeStamp'];
  public tasks: TasksModel[];
  constructor(
    private datesStoreService: DatesStoreService,
    private dateConvertService: DateConvertService,
    private crudService: CrudService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dateStart: [null, [Validators.required]],
      dateEnd: [null],
      type: [null, [Validators.required]],
      comment: []
    });
    this.getInfoFromStore();
    this.options = AgendaColors;
    this.subscribeToValueChanges();
  }

  private subscribeToValueChanges(): void {
    //this.form.get('dateStart').valueChanges.subscribe(res => this.changeDateStart(res.dateStart));
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

    this.crudService.addTask(object).then(() => {});
  }

  public changeDateStart(date: NgbDateStruct): void {
    this.datesStoreService.setDateStart(moment(date));
  }

  public changeDateEnd(date: NgbDateStruct): void {
    this.datesStoreService.setDateEnd(moment(date));
  }

  public getTitle(type: string): string {
    const object = this.options.find(i => i.id === type);
    return object.title;
  }

  private getInfoFromStore(): void {
    this.tasks$ = this.datesStoreService.getTasks();

    this.datesStoreService
      .getDateStart()
      .pipe(filter(i => !!i))
      .subscribe(res => {
        this.form.get('dateStart').setValue(res.toDate(), { emitEvent: false });
      });
    this.datesStoreService
      .getDateEnd()
      .pipe(filter(i => !!i))
      .subscribe(res => {
        this.form.get('dateEnd').setValue(res.toDate(), { emitEvent: false });
      });
  }
}
