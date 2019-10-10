import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { AgendaColors } from 'src/app/const/agenda-colors.const';
import { TaskModel } from 'src/app/models/tasks.models';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';

@Component({
  selector: 'app-description-history',
  templateUrl: './description-history.component.html',
  styleUrls: ['./description-history.component.scss']
})
export class DescriptionHistoryComponent implements OnInit, OnDestroy {
  tasks: TaskModel[];
  displayedColumns: string[];
  tasksSubscription: Subscription;

  constructor(
    private tasksStoreService: TasksStoreService,
    private contextStoreService: ContextStoreService,
    private employeeStoreService: EmployeeStoreService
  ) {}

  ngOnInit() {
    this.displayedColumns = ['date', 'who', 'type', 'comment'];

    const combined = combineLatest(this.tasksStoreService.getTasks(), this.contextStoreService.getCurrentDate$());

    this.tasksSubscription = combined.subscribe(([one, two]) => {
      console.log('data came to description history');
      this.tasks = one.filter(el => {
        return el.date.isSame(two);
      });
    });
  }

  public getTitle(id: number): string {
    return AgendaColors.find(o => o.id === id).title;
  }

  public getEmployee(model: TaskModel): string {
    const employee = this.employeeStoreService.getEmployeesSnapshot().find(o => o.id === model.userCreated);
    return employee.surname + ' ' + employee.name.substr(0, 1) + '.';
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }
}
