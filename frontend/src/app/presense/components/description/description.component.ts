import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MailApiService } from '../../../core/services/mail-api.service';
import { TaskApiService } from '../../../core/services/task-api.service';
import { ContextStoreService } from '../../../core/store/context-store.service';
import { EmployeeStoreService } from '../../../core/store/employee-store.service';
import { TasksStoreService } from '../../../core/store/tasks-store.service';
import { AgendaColors } from '../../../shared/const/agenda-colors.const';
import { AgendaColorsModel } from '../../../shared/models/agenda-colors.model';
import { Employee } from '../../../shared/models/employee.model';
import { SendMailRequestModel } from '../../../shared/models/send-mail.request.model';
import { SendingTaskModel } from '../../../shared/models/sending-task.model';
import { TaskModel } from '../../../shared/models/tasks.models';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { TaskMapperService } from '../../../shared/services/task-mapper.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() selectedUser: Employee;

  public form: FormGroup;
  public options: AgendaColorsModel[];
  private getCurrentDateSub = new Subscription();
  private getDayTypeSub = new Subscription();
  private getCommentSub = new Subscription();

  constructor(
    private snackbar: SnackbarService,
    private contextStoreService: ContextStoreService,
    private taskApiService: TaskApiService,
    private fb: FormBuilder,
    private mailApiService: MailApiService,
    private tasksStoreService: TasksStoreService,
    private employeeStoreService: EmployeeStoreService,
    private taskMapperService: TaskMapperService
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
    const sendingMail = this.bundleToSendingMail(val);
    const taskFormVal: TaskModel = {
      type: val.type.id,
      dateStart: moment(val.dateStart),
      dateEnd: val.dateEnd ? moment(val.dateEnd) : moment(val.dateStart),
      employee: this.selectedUser.mailNickname,
      comment: val.comment,
      dtCreated: moment(),
      employeeCreated: this.contextStoreService.getCurrentUser().mailNickname
    };
    const mappedForm = this.taskMapperService.mapToSendingModel(taskFormVal);

    this.taskApiService.addTask(mappedForm).subscribe(() => {
      this.snackbar.showSuccessSnackBar('Событие добавлено');
      this.tasksStoreService.update();
    });

    if (sendingMail.adress.length) {
      //this.mailApiService.sendMail(sendingMail).subscribe(key => console.log(key));
    }
  }

  public getTitle(id: number): string {
    return AgendaColors.find(o => o.id === id).title;
  }

  public changeDateStart(date: NgbDateStruct): void {
    this.contextStoreService.setCurrentDate(moment(date));
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

  private bundleToSendingMail(formValue: SendingTaskModel): SendMailRequestModel {
    const mailingAddresses = this.employeeStoreService
      .getEmployeesSnapshot()
      .filter(
        emp =>
          (emp.projects
            .filter(p => moment().isBetween(p.dateStart, p.dateEnd))
            .some((projectEmp: { title: string; dateStart: string; dateEnd: string }) => {
              return this.selectedUser.projects
                .filter(p => moment().isBetween(p.dateStart, p.dateEnd))
                .some(project => project.title === projectEmp.title);
            }) ||
            !emp.projects.length) &&
          emp.hasMailing
      )
      .filter(emp => this.contextStoreService.getCurrentUser().email !== emp.email)
      .map(emp => emp.email);
    const obj = {
      adress: mailingAddresses,
      author: this.contextStoreService.getCurrentUser().username,
      date: moment(formValue.dateStart).format('DD.MM.YYYY'),
      dateEnd: formValue.dateEnd ? moment(formValue.dateEnd).format('DD.MM.YYYY') : null,
      user: this.selectedUser.username,
      status: this.getTitle(formValue.type.id),
      comment: formValue.comment
    };

    return obj;
  }
}
