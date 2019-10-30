import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Employee } from './models/employee.model';
import { TaskModel } from './models/tasks.models';
import { EmployeeApiService } from './services/api/employee-api.service';
import { TaskApiService } from './services/api/task-api.service';
import { ContextStoreService } from './store/context-store.service';
import { EmployeeStoreService } from './store/employee-store.service';
import { TasksStoreService } from './store/tasks-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public tasksStore: any;

  constructor(
    private router: Router,
    private contextStoreService: ContextStoreService,
    private taskApiService: TaskApiService,
    private employeeApiService: EmployeeApiService,
    private employeeStoreService: EmployeeStoreService,
    private tasksStoreService: TasksStoreService
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => console.log(e));

    this.getTasks();
    this.tasksStoreService.updater().subscribe(() => this.getTasks());

    this.getEmployees();
    this.employeeStoreService.updater().subscribe(() => this.getEmployees());

    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (userSession) {
      this.employeeApiService.searchUserById(userSession).subscribe((key: Employee) => {
        this.contextStoreService.setCurrentUser(key);
      });
    }
  }

  private getTasks(): void {
    this.taskApiService.loadAllTasks().subscribe((res: TaskModel[]) => {
      const result = this.taskApiService.mapToTaskModel(res);
      this.tasksStoreService.addTasks(result);
    });
  }

  private getEmployees(): void {
    this.employeeApiService.loadAllEmployees().subscribe((key: Employee[]) => {
      this.employeeStoreService.addEmployees(key);
    });
  }
}
