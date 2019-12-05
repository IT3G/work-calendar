import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProjectModel } from '../../shared/models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsApiService {
  constructor(private http: HttpClient) {}

  public getProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${environment.baseUrl}/projects`);
  }

  public addProject(data: ProjectModel): Observable<ProjectModel> {
    return this.http.post<ProjectModel>(`${environment.baseUrl}/projects`, data);
  }
}
