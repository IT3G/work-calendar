import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeeApiService } from '../../../core/services/employee-api.service';
import { ContextStoreService } from '../../../core/store/context-store.service';
import { TasksStoreService } from '../../../core/store/tasks-store.service';
import { Employee } from '../../../shared/models/employee.model';
import { TaskModel } from '../../../shared/models/tasks.models';

@Component({
  selector: 'app-presence',
  templateUrl: './presence-page.component.html',
  styleUrls: ['./presence-page.component.scss']
})
export class PresencePageComponent implements OnInit, OnDestroy {
  public selectedUser: Employee;
  public tasks$: Observable<TaskModel[]>;
  private getCurrentUserSub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private contextStoreService: ContextStoreService,
    private tasksStoreService: TasksStoreService,
    private employeeApiService: EmployeeApiService
  ) {}

  ngOnInit() {
    this.checkRoute();
  }

  ngOnDestroy() {
    this.getCurrentUserSub.unsubscribe();
  }

  private searchTasksByUserNickname(mailNickname: string): Observable<TaskModel[]> {
    return this.tasksStoreService.getTasks().pipe(
      filter(task => !!task),
      map((tasksArr: TaskModel[]) => tasksArr.filter(task => task.employee === mailNickname))
    );
  }

  private checkRoute(): void {
    if (this.route.snapshot.params.id) {
      this.employeeApiService.searchUserByLogin(this.route.snapshot.params.id).subscribe((res: Employee) => {
        this.selectedUser = res;
        this.tasks$ = this.searchTasksByUserNickname(res.mailNickname);
      });
    } else {
      this.getCurrentUserSub.add(
        this.contextStoreService
          .getCurrentUser$()
          .pipe(filter(user => !!user))
          .subscribe(key => {
            this.selectedUser = key;
            this.tasks$ = this.searchTasksByUserNickname(key.mailNickname);
          })
      );
    }
  }
}
