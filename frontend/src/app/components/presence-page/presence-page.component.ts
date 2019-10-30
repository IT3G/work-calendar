import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { TaskModel } from 'src/app/models/tasks.models';
import { EmployeeApiService } from 'src/app/services/api/employee-api.service';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence-page.component.html',
  styleUrls: ['./presence-page.component.scss']
})
export class PresencePageComponent implements OnInit {
  selectedUser: Employee;
  tasks$: Observable<TaskModel[]>;
  employeeApiSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private contextStoreService: ContextStoreService,
    private tasksStoreService: TasksStoreService,
    private employeeApiService: EmployeeApiService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.employeeApiService.searchUserByLogin(this.route.snapshot.params.id).subscribe((res: Employee[]) => {
        this.selectedUser = res[0];
        this.tasks$ = this.searchTasksByUserNickname(res[0].mailNickname);
      });
    } else {
      this.selectedUser = this.contextStoreService.getCurrentUser();
      this.tasks$ = this.searchTasksByUserNickname(this.selectedUser.mailNickname);
    }
  }

  private searchTasksByUserNickname(mailNickname: string): Observable<TaskModel[]> {
    return this.tasksStoreService
      .getTasks()
      .pipe(map((tasksArr: TaskModel[]) => tasksArr.filter(task => task.employee === mailNickname)));
  }
}
