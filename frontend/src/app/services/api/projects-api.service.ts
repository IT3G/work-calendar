import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from '../../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ProjectsApiService {
  constructor(private http: HttpClient) {}

  public getProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>('/backend/projects');
  }
  public addProject(data: ProjectModel): Observable<ProjectModel> {
    return this.http.post<ProjectModel>('/backend/projects/add', data);
  }
}
