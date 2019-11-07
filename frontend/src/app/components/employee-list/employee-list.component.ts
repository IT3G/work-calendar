import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';
import { ProjectModel } from '../../models/projects.model';
import { ProjectsApiService } from '../../services/api/projects-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[];
  public projects$: Observable<ProjectModel[]>;
  public filter: FormControl;
  displayedColumns: string[];

  constructor(
    private employeeStoreService: EmployeeStoreService,
    private projectsApi: ProjectsApiService,
    private ar: ActivatedRoute
  ) {}

  ngOnInit() {
    this.filter = new FormControl();
    this.ar.queryParams.subscribe(res => this.filter.setValue(res.project));
    this.projects$ = this.projectsApi.getProjects();
    this.employeeStoreService.getEmployees().subscribe(res => (this.employees = res));
    this.setDisplayedColumns();
  }

  private setDisplayedColumns(): void {
    this.displayedColumns = ['username', 'login', 'projects', 'location', 'telNumber', 'isAdmin'];
  }
}
