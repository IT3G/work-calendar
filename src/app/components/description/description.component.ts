import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { TasksService } from '../../services/tasks.service';
import { TasksStoreService } from '../../store/tasks-store.service';
import { AgendaColors } from 'src/app/const/agenda-colors.const';
import { TaskApiService } from 'src/app/services/api/task-api.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  form: FormGroup;
  options: any[];

  constructor(
    private contextStoreService: ContextStoreService,
    private tasksService: TasksService,
    private tasksStoreService: TasksStoreService,
    private taskApiService: TaskApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dateStart: [{ value: null /*, disabled: true */ }, Validators.required],
      dateEnd: [null],
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
    const val = this.form.getRawValue();
    const dateStart = moment(val.dateStart);

    this.tasksService.addTask(this.contextStoreService.getSelectedUser(), val.type.id, dateStart, val.comment);

    if (val.dateEnd) {
      const lastDay = moment(val.dateEnd);

      let nextDate = dateStart;
      while (nextDate.isBefore(lastDay)) {
        nextDate = nextDate.clone().add(1, 'd');
        this.tasksService.addTask(this.contextStoreService.getSelectedUser(), val.type.id, nextDate, val.comment);
      }
    }
  }

  public changeDateStart(date: NgbDateStruct): void {
    this.contextStoreService.setCurrentDate(moment(date));
  }

  public changeDateEnd(date: NgbDateStruct): void {}

  typeChanged(event: any) {
    // Когда меняется тип - очищаем коммент для UX
    this.form.get('comment').setValue(null, { emitEvent: false });
  }

  private getInfoFromStore() {
    this.contextStoreService
      .getCurrentDate$()
      .pipe(filter(i => !!i))
      .subscribe(res => {
        this.form.get('dateStart').setValue(res.toDate(), { emitEvent: false });
        this.form.get('dateEnd').setValue(null, { emitEvent: false });
      });

    this.contextStoreService
      .getDayType$()
      .pipe(filter(i => !!i))
      .subscribe(res => {
        const agenda = AgendaColors.find(o => o.id === res);
        this.form.get('type').setValue(agenda, { emitEvent: false });
      });

    this.contextStoreService.getComment$().subscribe(res => {
      this.form.get('comment').setValue(res, { emitEvent: false });
    });
  }
}
