import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../../../shared/models/tasks.model';
import { DayType } from '../../../shared/const/day-type.const';
import { DialogService } from '../../../shared/services/dialog.service';
import { Employee } from '../../../shared/models/employee.model';

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

  @Output()
  private printWorkHoliday = new EventEmitter<TaskModel>();

  dayTypes = DayType;

  constructor(private dialog: DialogService) {}

  openApproveDialog(taskId: string) {
    this.dialog.confirm('Вы согласовали отпуск?').subscribe(res => res && this.approve.emit(taskId));
  }

  openDeleteDialog(taskId: string) {
    this.dialog.confirm('Вы уверены, что хотите удалить запись?').subscribe(res => res && this.deleteTask.emit(taskId));
  }

  printStatement(task: TaskModel): void {
    this.printWorkHoliday.emit(task);
  }
}
