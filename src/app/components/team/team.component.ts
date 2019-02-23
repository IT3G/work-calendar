import { Employee } from './../../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeStoreService } from '../../store/employee-store.service';
import { ContextStoreService } from '../../store/context-store.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private employeeStoreService: EmployeeStoreService, private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.employees$ = this.employeeStoreService.employees$;
  }

  public selectMember(employee: Employee) {
    this.contextStoreService.setSelectedUser(employee);
  }
}
