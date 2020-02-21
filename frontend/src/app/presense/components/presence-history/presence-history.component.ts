import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DayType } from '../../../shared/const/day-type.const';
import { Employee } from '../../../shared/models/employee.model';
import { TaskModel } from '../../../shared/models/tasks.model';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { PrintHelperService } from '../../../shared/services/print-helper.service';
import { VacationResolutionComponent } from '../vacation-resolution/vacation-resolution.component';

@Component({
  selector: 'app-presence-history',
  templateUrl: './presence-history.component.html',
  styleUrls: ['./presence-history.component.scss']
})
export class PresenceHistoryComponent {
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

  constructor(private confirm: ConfirmService, private printService: PrintHelperService, private dialog: MatDialog) {}

  openApproveDialog(taskId: string) {
    /** TODO: Проверять подключено ли файловое хранилище и выдавать разные попапы */
    // this.confirm.openDialog('Вы согласовали отпуск?').subscribe(res => res && this.approve.emit(taskId));

    const dialogRef = this.dialog.open(VacationResolutionComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  openDeleteDialog(taskId: string) {
    this.confirm
      .openDialog('Вы уверены, что хотите удалить запись?')
      .subscribe(res => res && this.deleteTask.emit(taskId));
  }

  printStatement(task: TaskModel): void {
    this.printService.printStatement(this.user.username, task.dateStart, task.dateEnd);
  }
}
