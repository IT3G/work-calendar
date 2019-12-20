import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HolidaysModel } from '../../shared/models/holidays.model';

@Injectable({
  providedIn: 'root'
})
export class HolidaysApiService {
  constructor(private http: HttpClient) {
  }
  public getAllHolidays(): Observable<HolidaysModel> {
    return this.http.get<HolidaysModel>(`${environment.baseUrl}/holidays`);
  }

  public upsertHolidays(holidays: HolidaysModel): Observable<HolidaysModel> {
    return this.http.post<HolidaysModel>(`${environment.baseUrl}/holidays`, holidays);
  }
}
