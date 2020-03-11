import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputFile } from 'ngx-input-file';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { EmployeeApiService } from '../../../core/services/employee-api.service';
import { HolidaysApiService } from '../../../core/services/holidays-api.service';
import { TaskApiService } from '../../../core/services/task-api.service';
import { ContextStoreService } from '../../../core/store/context-store.service';
import { Employee } from '../../../shared/models/employee.model';
import { HolidaysModel } from '../../../shared/models/holidays.model';
import { TaskModel } from '../../../shared/models/tasks.model';
import { TaskMapperService } from '../../../shared/services/task-mapper.service';

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
    private holidaysService: HolidaysApiService
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

  public approveTask(approve: { taskId: string; file?: InputFile }) {
    this.tasksApi.addResolution(approve.taskId, approve.file).subscribe(res => {
      const taskIndex = this.tasks.findIndex(t => t._id === res._id);
      this.tasks.splice(taskIndex, 1, res);
      this.updateTasks(this.tasks);
    });
  }

  public deleteTask(id: string) {
    this.tasksApi.deleteById(id).subscribe(() => this.updateTasks(this.tasks.filter(t => t._id !== id)));
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
}
