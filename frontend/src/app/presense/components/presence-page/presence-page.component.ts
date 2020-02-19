import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { EmployeeApiService } from '../../../core/services/employee-api.service';
import { ContextStoreService } from '../../../core/store/context-store.service';
import { Employee } from '../../../shared/models/employee.model';
import { TaskModel } from '../../../shared/models/tasks.model';
import { HolidaysModel } from '../../../shared/models/holidays.model';
import { HolidaysApiService } from '../../../core/services/holidays-api.service';
import { TaskApiService } from '../../../core/services/task-api.service';
import { TaskMapperService } from '../../../shared/services/task-mapper.service';
import { PrintHelperService } from '../../../shared/services/print-helper.service';
import { DialogService } from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence-page.component.html',
  styleUrls: ['./presence-page.component.scss']
})
export class PresencePageComponent implements OnInit, OnDestroy {
  public selectedUser: Employee;
  public currentUser: Employee;
  public holidays$: Observable<HolidaysModel[]>;
  private getCurrentUserSub = new Subscription();
  public tasks: TaskModel[] = [];
  public tasksToCalendar: TaskModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private contextStoreService: ContextStoreService,
    private tasksApi: TaskApiService,
    private tasksMapper: TaskMapperService,
    private employeeApiService: EmployeeApiService,
    private holidaysService: HolidaysApiService,
    private printService: PrintHelperService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.checkRoute();
    this.holidays$ = this.holidaysService.getAllHolidays();
    this.currentUser = this.contextStoreService.getCurrentUser();
  }

  ngOnDestroy() {
    this.getCurrentUserSub.unsubscribe();
  }

  public onAddTask(e: TaskModel) {
    this.updateTasks([...this.tasks, e]);
  }

  private checkRoute(): void {
    this.getCurrentUserSub.add(
      this.route.params
        .pipe(
          switchMap(params => this.getUserByIdOrCurrent(params.id)),
          tap(res => (this.selectedUser = res)),
          switchMap(res => this.tasksApi.loadAllTasksByEmployee(res.mailNickname))
        )
        .subscribe(tasks => this.updateTasks(tasks))
    );
  }

  public approveTask(id: string) {
    this.tasksApi.update(id, { approved: true }).subscribe(res => {
      const task = this.tasks.find(t => t._id === id);
      task.approved = true;
    });
  }

  public deleteTask(id: string) {
    this.tasksApi.deleteById(id).subscribe(() => this.updateTasks(this.tasks.filter(t => t._id !== id)));
  }

  /** печать заявления на отпуск */
  public printWorkHoliday(task: TaskModel): void {
    if (this.isValidUsername(this.selectedUser.username)) {
      this.printService.printStatement(this.selectedUser.username, task.dateStart, task.dateEnd);
      return;
    }

    this.showDialogToUpdateUser().subscribe(() => {
      this.printWorkHoliday(task);
    });
  }

  private getUserByIdOrCurrent(id?: string): Observable<Employee> {
    if (id) {
      return this.employeeApiService.searchUserByLogin(id);
    }

    return this.contextStoreService.getCurrentUser$().pipe(filter(u => !!u));
  }

  private updateTasks(tasks: TaskModel[]) {
    this.tasks = tasks;
    this.tasksToCalendar = this.tasksMapper.mapTasksToCalendar(this.tasks);
  }

  /** проверка валидности ФИО */
  private isValidUsername(username: string): boolean {
    return /^\S+?\s\S+?\s\S+?$/.test(username);
  }

  /** принудить пользователя к коррекции своего ФИО  */
  private showDialogToUpdateUser(): Observable<unknown> {
    return this.dialog.userNameUpdate(this.selectedUser.username).pipe(
      filter(Boolean),
      switchMap((username: string) => this.updateUserInfo({ ...this.selectedUser, username }))
    );
  }

  /** обновить данные выделенного пользователя */
  private updateUserInfo(user: Employee): Observable<unknown> {
    return this.employeeApiService.updateUserInfo(user.mailNickname, user).pipe(tap(() => (this.selectedUser = user)));
  }
}
