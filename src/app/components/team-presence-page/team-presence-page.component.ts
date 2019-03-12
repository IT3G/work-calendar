import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { TaskModel } from 'src/app/models/tasks.models';
import { TaskApiService } from 'src/app/services/api/task-api.service';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { DayType } from 'src/app/const/day-type.const';
@Component({
  selector: 'app-team-presence',
  templateUrl: './team-presence-page.component.html',
  styleUrls: ['./team-presence-page.component.scss']
})
export class TeamPresencePageComponent implements OnInit {
  currentMonth: Moment;
  form: FormArray;
  days: Date[];
  employeeForm: FormArray;
  employees$: Observable<Employee[]>;
  employees: Employee[];
  getEmployees$: Observable<any>;
  getTasks$: Observable<any>;

  public tasks: TaskModel[];
  constructor(
    private fb: FormBuilder,
    private employeeStoreService: EmployeeStoreService,
    private tasksStoreService: TasksStoreService,
    private taskApiService: TaskApiService
  ) {}

  ngOnInit() {
    this.employees$ = this.employeeStoreService.employees$;
    this.currentMonth = moment();
    this.getRangeArray();
    this.initForm();
    this.loadTasksFromStore();
  }

  public employeeArray(employee: FormGroup): FormArray {
    const control = employee.get('days') as FormArray;
    return control;
  }

  public chooseClass(id: number): string {
    const dayType = DayType[id];
    return `type_${dayType}`;
  }

  public prevMonth(): void {
    this.currentMonth = moment(this.currentMonth).subtract(1, 'months');
    this.initForm();
    this.initEmployeeForm();
  }

  public nextMonth(): void {
    this.currentMonth = moment(this.currentMonth).add(1, 'months');
    this.initForm();
    this.initEmployeeForm();
  }

  public initForm(): void {
    const array: Date[] = this.getRangeArray();
    this.form = this.fb.array(
      array.map(i => {
        return this.fb.control(i);
      })
    );
  }

  private loadTasksFromStore() {
    this.taskApiService.loadAllTasks();
    this.tasksStoreService
      .getTasks$()
      .pipe(filter(i => !!i.length))
      .subscribe(res => {
        this.tasks = res;
        this.employees$.pipe(filter(i => !!i.length)).subscribe(employees => {
          this.employees = employees;
          this.initEmployeeForm();
        });
      });
  }

  private getRangeArray(): Date[] {
    const currentMonth = this.currentMonth;

    const startOfMonth = moment(currentMonth).startOf('month');
    const endOfMonth = moment(currentMonth).endOf('month');

    const days = [];
    let day: Moment = startOfMonth;

    while (day <= endOfMonth) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }
    this.days = days;
    return days;
  }

  private initEmployeeForm(): void {
    this.employeeForm = this.fb.array(
      this.employees.map(employee => {
        return this.createEmployeeFormGroup(employee);
      })
    );
  }

  private createEmployeeFormGroup(employee: Employee): FormGroup {
    return this.fb.group({
      title: employee,
      days: this.fb.array(
        this.days.map(day => {
          return this.createDayFormGroup(day, employee);
        })
      )
    });
  }

  private createDayFormGroup(day: Date, employee: Employee): FormGroup {
    return this.fb.group({
      dayTitle: day,
      type: this.getType(employee, day)
    });
  }

  private getType(employee: Employee, day: Date): number {
    const task = this.tasks.find(i => i.employeeId === employee.id && moment(day).isSame(i.date, 'day'));
    if (task) {
      return task.type;
    }
    return null;
  }
}
