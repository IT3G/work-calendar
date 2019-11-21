import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { EmployeeApiService } from './core/services/employee-api.service';
import { GitInfoService } from './core/services/git-info.service';
import { TaskApiService } from './core/services/task-api.service';
import { ContextStoreService } from './core/store/context-store.service';
import { EmployeeStoreService } from './core/store/employee-store.service';
import { TasksStoreService } from './core/store/tasks-store.service';
import { Employee } from './shared/models/employee.model';
import { TaskModel } from './shared/models/tasks.models';
import { TaskMapperService } from './shared/services/task-mapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public userSession: string;
  public subscription = new Subscription();
  constructor(
    private title: Title,
    private gitInfo: GitInfoService,
    private contextStoreService: ContextStoreService,
    private taskApiService: TaskApiService,
    private employeeApiService: EmployeeApiService,
    private employeeStoreService: EmployeeStoreService,
    private tasksStoreService: TasksStoreService,
    private taskMapperService: TaskMapperService
  ) {}

  ngOnInit() {
    this.getInfoFromStore();
    this.addGitVersionToPageTitle();
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

  /** Добавление версии в заголовок */
  private addGitVersionToPageTitle(): void {
    const currentTitle = this.title.getTitle();
    this.gitInfo.getVersionAsString().subscribe(version => {
      this.title.setTitle(`${currentTitle} (${version})`);
    });
  }
}
