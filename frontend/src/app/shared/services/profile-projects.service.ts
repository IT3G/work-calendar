import { Injectable } from '@angular/core';

import { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { ContextStoreService } from 'src/app/core/store/context-store.service';

import { Employee } from '../models/employee.model';
import { ProjectNewModel } from '../models/project-new.model';

@Injectable({ providedIn: 'root' })
export class ProfileProjectsService {
  public selectedUser: Employee;

  constructor(private employeeApiService: EmployeeApiService, private contextStoreService: ContextStoreService) {}

  public deleteProject(project: ProjectNewModel): void {
    this.selectedUser = this.contextStoreService.getSelectedUserValue();

    const deletableProjectIndex = this.selectedUser.projectsNew.findIndex((p) => p.project_id === project.project_id);
    const filteredProjects = this.selectedUser.projectsNew.filter((p, index) => {
      return index !== deletableProjectIndex;
    });

    this.employeeApiService
      .updateUserInfo(this.selectedUser.mailNickname, { ...this.selectedUser, projectsNew: [...filteredProjects] })
      .subscribe((user) => {
        this.contextStoreService.setSelectedUser(user);
      });
  }

  public deleteMonthFromProjects(date: Moment): void {
    const month = date.month() + 1;
    const year = date.year();
    this.selectedUser = this.contextStoreService.getSelectedUserValue();

    const filteredProjects = this.selectedUser.projectsNew
      .map((p, index) => {
        const newMetadata = p.metadata.filter((metadata) => {
          return metadata.month !== month || metadata.year !== year;
        });
        return { ...p, metadata: newMetadata };
      })
      .filter((p) => (p.metadata.length ? true : false));

    this.employeeApiService
      .updateUserInfo(this.selectedUser.mailNickname, { ...this.selectedUser, projectsNew: [...filteredProjects] })
      .subscribe((user) => {
        this.contextStoreService.setSelectedUser(user);
      });
  }
}
