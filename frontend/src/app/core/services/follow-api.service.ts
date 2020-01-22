import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FollowModel } from '../../shared/models/follow.model';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class FollowApiService {
  constructor(private http: HttpClient) {
  }

  public getAllForMe(userId: string): Observable<FollowModel[]> {
    return this.http.get<FollowModel[]>(`${environment.baseUrl}/follow/follow-all/${userId}`);
  }

  public getMyFollowing(userId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.baseUrl}/follow/following/${userId}`);
  }

  public getMyRemovedFollowing(userId: string): Observable<FollowModel[]> {
    return this.http.get<FollowModel[]>(`${environment.baseUrl}/follow/remove-following/${userId}`);
  }

  public getMyAddedFollowing(userId: string): Observable<FollowModel[]> {
    return this.http.get<FollowModel[]>(`${environment.baseUrl}/follow/add-following/${userId}`);
  }

  public addFollow(data: FollowModel): Observable<any> {
    return this.http.post<FollowModel>(`${environment.baseUrl}/follow`, data);
  }

  public deleteFollow(id: string): Observable<any> {
    return this.http.delete<FollowModel>(`${environment.baseUrl}/follow/${id}`);
  }

  public getMyFollowers(userId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.baseUrl}/follow/follower/${userId}`);
  }
}
