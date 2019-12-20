import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HolidaysSendModel } from '../../shared/models/holidays.model';

@Injectable({
  providedIn: 'root'
})
export class HolidaysApiService {
  constructor(private http: HttpClient) {
  }
  public getAllHolidays(): Observable<HolidaysSendModel[]> {
    return this.http.get<HolidaysSendModel[]>(`${environment.baseUrl}/holidays`);
  }

  public deleteHolidays(): Observable<HolidaysSendModel[]> {
    return this.http.delete<HolidaysSendModel[]>(`${environment.baseUrl}/holidays`);
  }

  public addHolidays(holidays: HolidaysSendModel[]): Observable<HolidaysSendModel[]> {
    return this.http.post<HolidaysSendModel[]>(`${environment.baseUrl}/holidays`, holidays);
  }
}
