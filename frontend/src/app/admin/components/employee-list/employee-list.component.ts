import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { first, share, switchMap, take, tap } from 'rxjs/operators';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { Employee } from '../../../shared/models/employee.model';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  public employees: Employee[];
  public projects$: Observable<DictionaryModel[]>;
  public filter: FormControl;
  public displayedColumns: string[];
  public login: string;

  private subscription = new Subscription();

  @HostListener('click', ['$event.target'])
  public onClickTh(btn: HTMLElement) {
    console.log(btn.attributes.getNamedItem('data-column-name').value);
  }

  constructor(
    private dictionaryApi: DictionaryApiService,
    private employeeApi: EmployeeApiService,
    private snackbar: SnackbarService,
    private ar: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.filter = new FormControl();
    this.ar.queryParams.subscribe((res) => this.filter.setValue(res.project));
    this.projects$ = this.dictionaryApi.getAll('project');
    this.employeeApi.loadAllEmployees().subscribe((res) => (this.employees = res));
    this.setDisplayedColumns();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      width: '250px',
      data: { login: this.login },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.employeeApi
        .addNewUser({ username: result })
        .pipe(switchMap(() => this.employeeApi.loadAllEmployees()))
        .subscribe(
          (res) => {
            this.employees = res;
            this.snackbar.showSuccessSnackBar('Пользователь успешно добавлен');
          },
          (error) => this.showErrorMessage(error)
        );
    });
  }

  public delete(user: Employee) {
    this.employeeApi
      .deleteUser(user._id)
      .pipe(
        first(),
        switchMap(() => this.employeeApi.loadAllEmployees())
      )
      .subscribe((res) => {
        this.employees = res;
        this.snackbar.showSuccessSnackBar('Пользователь успешно удален');
      });
  }

  private setDisplayedColumns(): void {
    this.displayedColumns = [
      'username',
      'login',
      'birthday',
      'jobPosition',
      'releaseDate',
      'terminationDate',
      'subdivision',
      'projects',
      'location',
      'telNumber',
      'isAdmin',
      'deleteUser',
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
