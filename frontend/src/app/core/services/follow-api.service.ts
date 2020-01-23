import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FollowModel, UserFollow } from '../../shared/models/follow.model';

@Injectable({
  providedIn: 'root'
})
export class FollowApiService {
  constructor(private http: HttpClient) {
  }

  public getUserFollow(userId: string): Observable<UserFollow> {
    return this.http.get<UserFollow>(`${environment.baseUrl}/follow/user-follow/${userId}`);
  }

  public addFollow(data: FollowModel): Observable<any> {
    return this.http.post<FollowModel>(`${environment.baseUrl}/follow`, data);
  }

  public deleteFollow(id: string): Observable<any> {
    return this.http.delete<FollowModel>(`${environment.baseUrl}/follow/${id}`);
  }
}
