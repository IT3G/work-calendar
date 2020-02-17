import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushApiService {
  constructor(private http: HttpClient) {}

  createSubscription(mailNickname: string, sub: any): Observable<any> {
    return this.http.post(`http://localhost:3000/push/${mailNickname}`, sub);
  }
}
