import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthGuardService } from './guards/auth-guard.service';
import { Employee } from './models/employee.model';
import { TaskModel } from './models/tasks.models';
import { EmployeeApiService } from './services/api/employee-api.service';
import { TaskApiService } from './services/api/task-api.service';
import { TaskMapperService } from './services/mappers/task-mapper.service';
import { ContextStoreService } from './store/context-store.service';
import { EmployeeStoreService } from './store/employee-store.service';
import { TasksStoreService } from './store/tasks-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public userSession: string;
  public subscription = new Subscription();
  constructor(
    private contextStoreService: ContextStoreService,
    private taskApiService: TaskApiService,
    private employeeApiService: EmployeeApiService,
    private employeeStoreService: EmployeeStoreService,
    private tasksStoreService: TasksStoreService,
    private taskMapperService: TaskMapperService,
    private authGuardService: AuthGuardService
  ) {}

  ngOnInit() {
    this.getInfoFromStore();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getInfoFromStore() {
    this.getEmployees();
    this.getTasks();
    this.subscription.add(this.tasksStoreService.updater().subscribe(() => this.getTasks()));
    this.subscription.add(this.employeeStoreService.updater().subscribe(() => this.getEmployees()));
    this.userSession = JSON.parse(localStorage.getItem('userSession'));
    if (this.userSession) {
      this.getCurrentUser(this.userSession);
      this.subscription.add(this.contextStoreService.updater().subscribe(() => this.getCurrentUser(this.userSession)));
      this.authGuardService.isActivated = true;
    }
  }

  private getTasks(): void {
    this.subscription.add(
      this.taskApiService.loadAllTasks().subscribe((res: TaskModel[]) => {
        const result = this.taskMapperService.mapToTaskModel(res);
        this.tasksStoreService.addTasks(result);
      })
    );
  }

  private getEmployees(): void {
    this.subscription.add(
      this.employeeApiService.loadAllEmployees().subscribe((key: Employee[]) => {
        this.employeeStoreService.addEmployees(key);
      })
    );
  }

  private getCurrentUser(id: string): void {
    this.subscription.add(
      this.employeeApiService.searchUserById(id).subscribe((key: Employee) => {
        this.contextStoreService.setCurrentUser(key);
      })
    );
  }
}
