import { Employee } from './../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeStoreService } from '../store/employee-store.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  // employees$: Observable<Employee[]>;
  // employees: Employee[];

  constructor(private employeeStoreService: EmployeeStoreService) {}

  ngOnInit() {
    //   this.employees$ = this.stateService.getEmployees();
    //   this.employees$.subscribe(timedItem => {
    //     console.log(timedItem);
    //   });
    //   // this.employees$.subscribe(o => (this.employees = o));
  }
}
