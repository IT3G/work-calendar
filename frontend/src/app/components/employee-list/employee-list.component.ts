import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public employees$: Observable<Employee[]>;
  displayedColumns: string[];

  constructor(private employeeStoreService: EmployeeStoreService) {}

  ngOnInit() {
    this.employees$ = this.employeeStoreService.getEmployees();
    this.setDisplayedColumns();
  }

  private setDisplayedColumns(): void {
    this.displayedColumns = ['username', 'login', 'projects', 'location', 'telNumber', 'isAdmin'];
  }
}
