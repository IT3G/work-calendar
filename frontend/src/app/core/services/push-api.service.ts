import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushApiService {
  constructor(private http: HttpClient) {}

  createSubscription(mailNickname: string, sub: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/push/${mailNickname}`, sub);
  }
}
