import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputFile } from 'ngx-input-file';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { ContextStoreService } from 'src/app/core/store/context-store.service';
import { PrintInfo } from 'src/app/shared/services/print-info';
import { environment } from '../../../../environments/environment';
import { DayType } from '../../../shared/const/day-type.const';
import { Employee } from '../../../shared/models/employee.model';
import { TaskModel } from '../../../shared/models/tasks.model';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { PrintHelperService } from '../../../shared/services/print-helper.service';
import { UsernameUpdateComponent } from '../username-update-dialog/username-update-dialog.component';
import { VacationResolutionComponent } from '../vacation-resolution/vacation-resolution.component';

@Component({
  selector: 'app-presence-history',
  templateUrl: './presence-history.component.html',
  styleUrls: ['./presence-history.component.scss']
})
export class PresenceHistoryComponent {
  private readonly IS_CONFRMED = 'Вы согласовали отпуск?';
  private readonly IS_DELETE = 'Вы уверены, что хотите удалить запись?';

  @Input()
  tasks: TaskModel[];

  @Input()
  user: Employee;

  @Input()
  currentUser: Employee;

  @Output()
  deleteTask = new EventEmitter<string>();

  @Output()
  approve = new EventEmitter<{ taskId: string; file?: InputFile }>();

  dayTypes = DayType;

  constructor(
    private confirm: ConfirmService,
    private dialog: MatDialog,
    private printService: PrintHelperService,
    private employeeApiService: EmployeeApiService,
    private contextStoreService: ContextStoreService
  ) {}

  openApproveDialog(taskId: string) {
    this.getVacationApproveDialog().subscribe(file => this.approve.emit({ taskId, file }));
  }

  /**
   * Попап с драг-н-дропом файла в случае если файловое хранилище включено
   * Мапим его к формату InputFile
   * */
  private getVacationApproveDialog(): Observable<InputFile> {
    const settings = this.contextStoreService.settings$.value;
    if (settings.FEATURE_FILE_STORAGE === 'YES') {
      const dialog = this.dialog.open(VacationResolutionComponent, {
        width: '400px'
      });

      return dialog.afterClosed().pipe(filter(res => !!res));
    }

    return this.confirm.openDialog(this.IS_CONFRMED).pipe(
      filter(res => !!res),
      map(() => null)
    );
  }

  downloadAttachment(taskId: string) {
    window.open(`${environment.baseUrl}/tasks/resolution/${taskId}`, '_blank');
  }

  openDeleteDialog(taskId: string) {
    this.confirm.openDialog(this.IS_DELETE).subscribe(res => res && this.deleteTask.emit(taskId));
  }

  printStatement(task: TaskModel): void {
    this.userNameUpdate(this.user)
      .pipe(filter(i => !!i))
      .subscribe(o => {
        this.employeeApiService.updateUserPatronymic(this.user.mailNickname, o.patronymic).subscribe(i => {
          this.contextStoreService.setCurrentUser(i);
          this.printService.printStatement(o, task.dateStart, task.dateEnd);
        });
      });
  }

  private userNameUpdate(user: Employee, width = '400px'): Observable<PrintInfo> {
    const dialogRef = this.dialog.open(UsernameUpdateComponent, {
      width,
      data: { user }
    });

    return dialogRef.afterClosed();
  }
}
