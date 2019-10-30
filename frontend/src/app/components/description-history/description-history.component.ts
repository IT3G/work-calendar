import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { AgendaColors } from 'src/app/const/agenda-colors.const';
import { Employee } from 'src/app/models/employee.model';
import { TaskModel } from 'src/app/models/tasks.models';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';

@Component({
  selector: 'app-description-history',
  templateUrl: './description-history.component.html',
  styleUrls: ['./description-history.component.scss']
})
export class DescriptionHistoryComponent implements OnInit, OnDestroy {
  tasks: TaskModel[];
  displayedColumns: string[];
  tasksSubscription: Subscription;

  @Input() tasks$: Observable<TaskModel[]>;

  constructor(private contextStoreService: ContextStoreService, private employeeStoreService: EmployeeStoreService) {}

  ngOnInit() {
    this.displayedColumns = ['date', 'who', 'type', 'comment'];

    const combined = combineLatest(this.tasks$, this.contextStoreService.getCurrentDate$());

    this.tasksSubscription = combined.subscribe(([one, two]) => {
      this.tasks = one.filter(el => {
        return el.dateStart.isSame(two);
      });
    });
  }

  public getTitle(id: number): string {
    return AgendaColors.find(o => o.id === id).title;
  }

  public getEmployee(model: TaskModel): string {
    const employee = this.employeeStoreService
      .getEmployeesSnapshot()
      .find((o: Employee) => o.mailNickname === model.employeeCreated);
    return employee.username.split(' ')[0] + ' ' + employee.username.split(' ')[1].substr(0, 1) + '.';
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }
}
