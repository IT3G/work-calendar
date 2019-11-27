import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubdivisionModel } from '../../shared/models/subdivisions.model';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionApiService {
  constructor(private http: HttpClient) {}

  public getSubdivisions(): Observable<SubdivisionModel[]> {
    return this.http.get<SubdivisionModel[]>(`${environment.baseUrl}/subdivisions`);
  }
  public addSubdivision(data: SubdivisionModel): Observable<SubdivisionModel> {
    return this.http.post<SubdivisionModel>(`${environment.baseUrl}/subdivisions/add`, data);
  }
}
