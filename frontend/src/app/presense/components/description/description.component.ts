import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TaskApiService } from '../../../core/services/task-api.service';
import { ContextStoreService } from '../../../core/store/context-store.service';
import { TasksStoreService } from '../../../core/store/tasks-store.service';
import { AgendaColors } from '../../../shared/const/agenda-colors.const';
import { AgendaColorsModel } from '../../../shared/models/agenda-colors.model';
import { Employee } from '../../../shared/models/employee.model';
import { TaskModel } from '../../../shared/models/tasks.model';
import { PrintHelperService } from '../../../shared/services/print-helper.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() selectedUser: Employee;
  @Input() tasks: TaskModel[];

  @Output() onAddTask = new EventEmitter<TaskModel>();

  public form: FormGroup;
  public options: AgendaColorsModel[];
  private getCurrentDateSub = new Subscription();
  private getDayTypeSub = new Subscription();
  private getCommentSub = new Subscription();

  constructor(
    private snackbar: SnackbarService,
    private contextStoreService: ContextStoreService,
    private taskApiService: TaskApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.getInfoFromStore();
    this.options = AgendaColors;
  }

  private initForm(): void {
    this.form = this.fb.group({
      dateStart: [null, Validators.required],
      dateEnd: [null],
      type: [null, Validators.required],
      comment: [null]
    });
  }

  public addTask(): void {
    if (this.form.invalid) {
      alert('Заполните форму');
      return;
    }
    const val = this.form.getRawValue();
    const taskFormVal: TaskModel = {
      _id: null,
      type: val.type.id,
      dateStart: this.formatDate(val.dateStart),
      dateEnd: val.dateEnd ? this.formatDate(val.dateEnd) : this.formatDate(val.dateStart),
      employee: this.selectedUser.mailNickname,
      comment: val.comment,
      dtCreated: moment().toISOString(),
      approved: false,
      employeeCreated: this.contextStoreService.getCurrentUser().mailNickname
    };

    this.taskApiService.addTask(taskFormVal).subscribe(res => {
      this.snackbar.showSuccessSnackBar('Событие добавлено');
      this.onAddTask.emit(res);
    });
  }

  public resetComment(): void {
    this.form.get('comment').setValue(null, { emitEvent: false });
  }

  private getInfoFromStore(): void {
    this.getCurrentDateSub.add(
      this.contextStoreService
        .getCurrentDate$()
        .pipe(filter(i => !!i))
        .subscribe(res => {
          this.form.get('dateStart').setValue(res.toDate(), { emitEvent: false });
          this.form.get('dateEnd').setValue(null, { emitEvent: false });
        })
    );

    this.getDayTypeSub.add(
      this.contextStoreService
        .getDayType$()
        .pipe(filter(i => !!i))
        .subscribe(res => {
          const agenda = AgendaColors.find(o => o.id === res);
          this.form.get('type').setValue(agenda, { emitEvent: false });
        })
    );

    this.getCommentSub.add(
      this.contextStoreService.getComment$().subscribe(res => {
        this.form.get('comment').setValue(res, { emitEvent: false });
      })
    );
  }

  private formatDate(date: string): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
