import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';
import { AgendaColors } from 'src/app/const/agenda-colors.const';
import { AgendaColorsModel } from 'src/app/models/agenda.colors.model';
import { Employee } from 'src/app/models/employee.model';
import { TaskModel } from 'src/app/models/tasks.models';
import { MailApiInBackendService } from 'src/app/services/api/impl/backend/mail-api-in-backend.service';
import { TaskApiService } from 'src/app/services/api/task-api.service';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit, OnDestroy {
  form: FormGroup;
  options: AgendaColorsModel[];

  @Input() selectedUser: Employee;

  constructor(
    private contextStoreService: ContextStoreService,
    private taskApiService: TaskApiService,
    private fb: FormBuilder,
    private mailApiInBackendService: MailApiInBackendService,
    private tasksStoreService: TasksStoreService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dateStart: [null, Validators.required],
      dateEnd: [null],
      type: [null, Validators.required],
      comment: [null]
    });
    this.getInfoFromStore();
    this.options = AgendaColors;
  }

  ngOnDestroy() {}

  public addTask(): void {
    const val = this.form.getRawValue();
    const task: TaskModel = {
      type: val.type.id,
      dateStart: moment(val.dateStart),
      dateEnd: val.dateEnd ? moment(val.dateEnd) : moment(val.dateStart),
      employee: this.selectedUser.mailNickname,
      comment: val.comment,
      dtCreated: moment()
    };

    if (this.form.invalid) {
      alert('Заполните форму');
      return;
    }

    this.taskApiService.addTask(task).subscribe(() => this.tasksStoreService.update());

    // this.mailApiInBackendService.sendMail().subscribe(key => console.log(key));
  }

  public changeDateStart(date: NgbDateStruct): void {
    this.contextStoreService.setCurrentDate(moment(date));
  }

  public typeChanged() {
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
