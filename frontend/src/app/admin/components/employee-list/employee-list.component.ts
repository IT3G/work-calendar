import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { SortOrder } from 'src/app/shared/enums/sort-order.enum';
import { DeleteConfrimPopupComponent } from 'src/app/shared/pop-up/delete-confirm-pop-up/delete-confrim-popup.component';
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

  private prevAttribute: string;

  private currentSortOrder = SortOrder.asc;
  subscription = new Subscription();

  @HostListener('click', ['$event.target'])
  public onClickTable(element: HTMLElement): void {
    const attrDateAttributes = ['whenCreated', 'birthday', 'terminationDate'];

    const dataColumnNameAttr = element.attributes.getNamedItem('data-column-name');
    if (!dataColumnNameAttr) {
      return;
    }

    const attrValue = dataColumnNameAttr.value;

    if (attrDateAttributes.includes(attrValue)) {
      this.sortByDate(attrValue);
      this.prevAttribute = attrValue;
      return;
    }

    this.sortByOtherFields(attrValue);
    this.prevAttribute = attrValue;
    return;
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
    const dialogRef = this.dialog.open(DeleteConfrimPopupComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => !!res),
        switchMap(() => this.employeeApi.deleteUser(user._id)),
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
      'projectOffice',
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

  private sortByDate(attrValue: string): void {
    if (this.prevAttribute === attrValue && this.currentSortOrder === SortOrder.asc) {
      this.currentSortOrder = SortOrder.desc;
      this.employees = this.employees
        .map((employee) => ({ ...employee, terminationDate: employee.terminationDate ?? undefined }))
        .sort((a, b) => moment(b[attrValue]).diff(moment(a[attrValue])));
      return;
    }
    this.employees = this.employees
      .map((employee) => ({ ...employee, terminationDate: employee.terminationDate ?? undefined }))
      .sort((a, b) => {
        return moment(a[attrValue]).diff(moment(b[attrValue]));
      });
    this.currentSortOrder = SortOrder.asc;
  }

  private sortByOtherFields(attrValue: string): void {
    if (this.prevAttribute === attrValue && this.currentSortOrder === SortOrder.asc) {
      this.employees = [...this.employees].sort((a, b) => {
        if (a[attrValue] < b[attrValue]) {
          return 1;
        }
        if (a[attrValue] > b[attrValue]) {
          return -1;
        }
        return 0;
      });
      this.currentSortOrder = SortOrder.desc;
      return;
    }

    this.employees = [...this.employees].sort((a, b) => {
      if (a[attrValue] < b[attrValue]) {
        return -1;
      }
      if (a[attrValue] > b[attrValue]) {
        return 1;
      }
      return 0;
    });
    this.currentSortOrder = SortOrder.asc;
  }
}
