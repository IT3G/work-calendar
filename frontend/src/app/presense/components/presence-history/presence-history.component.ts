import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../../../shared/models/tasks.model';
import { DayType } from '../../../shared/const/day-type.const';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { PrintHelperService } from '../../../shared/services/print-helper.service';
import { Employee } from '../../../shared/models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { UsernameUpdateComponent } from '../username-update-dialog/username-update-dialog.component';
import { Observable } from 'rxjs';
import { ContextStoreService } from 'src/app/core/store/context-store.service';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { PrintInfo } from 'src/app/shared/services/print-info';
import { filter } from 'rxjs/operators';

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
  approve = new EventEmitter<string>();

  dayTypes = DayType;

  constructor(
    private confirm: ConfirmService,
    private dialog: MatDialog,
    private printService: PrintHelperService,
    private employeeApiService: EmployeeApiService,
    private contextStoreService: ContextStoreService
  ) {}

  openApproveDialog(taskId: string) {
    this.confirm.openDialog(this.IS_CONFRMED).subscribe(res => res && this.approve.emit(taskId));
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
