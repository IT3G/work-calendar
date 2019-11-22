import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JobPositionModel } from '../../shared/models/job-position.model';

@Injectable({
  providedIn: 'root'
})
export class JobPositionApiService {
  constructor(private http: HttpClient) {}
  private readonly baseUrl = `${environment.baseUrl}/jobPosition`;

  getAll(): Observable<JobPositionModel[]> {
    return this.http.get<JobPositionModel[]>(this.baseUrl);
  }

  addPosition(jobPosition: JobPositionModel): Observable<JobPositionModel> {
    return this.http.post<JobPositionModel>(this.baseUrl, jobPosition);
  }

  deletePosition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
