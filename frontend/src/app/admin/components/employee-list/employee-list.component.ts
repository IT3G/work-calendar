import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ProjectsApiService } from '../../../core/services/projects-api.service';
import { EmployeeStoreService } from '../../../core/store/employee-store.service';
import { Employee } from '../../../shared/models/employee.model';
import { ProjectModel } from '../../../shared/models/projects.model';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  public employees: Employee[];
  public projects$: Observable<ProjectModel[]>;
  public filter: FormControl;
  public displayedColumns: string[];
  public login: string;

  private subscription = new Subscription();

  constructor(
    private employeeStoreService: EmployeeStoreService,
    private projectsApi: ProjectsApiService,
    private employeeApi: EmployeeApiService,
    private snackbar: SnackbarService,
    private ar: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.filter = new FormControl();
    this.ar.queryParams.subscribe(res => this.filter.setValue(res.project));
    this.projects$ = this.projectsApi.getProjects();
    this.subscription.add(this.employeeStoreService.getEmployees().subscribe(res => (this.employees = res)));
    this.setDisplayedColumns();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      width: '250px',
      data: { login: this.login }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.employeeApi.addNewUser({ username: result }).subscribe(
        () => {
          this.employeeStoreService.update();
          this.snackbar.showSuccessSnackBar('Пользователь успешно добавлен');
        },
        error => this.showErrorMessage(error)
      );
    });
  }

  private setDisplayedColumns(): void {
    this.displayedColumns = [
      'username',
      'login',
      'jobPosition',
      'subdivision',
      'projects',
      'location',
      'telNumber',
      'isAdmin'
    ];
  }

  private showErrorMessage(res: HttpErrorResponse): void {
    const error = res.error;

    if (error === 'USER NOT FOUND') {
      this.snackbar.showErrorSnackBar('Пользователь не найден');
      return;
    }

    if (error === 'USER ALREADY EXIST') {
      this.snackbar.showErrorSnackBar('Пользователь уже существует');
      return;
    }
  }
}
