import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FollowModel } from '../../shared/models/follow.model';

@Injectable({
  providedIn: 'root'
})
export class FollowApiService {
  constructor(private http: HttpClient) {
  }

  public getAllFollow(): Observable<FollowModel[]> {
    return this.http.get<FollowModel[]>(`${environment.baseUrl}/follow`);
  }

  public getMyFollowing(user: string): Observable<FollowModel[]> {
    return this.http.get<FollowModel[]>(`${environment.baseUrl}/follow/following/${user}`);
  }

  public getMyFollowers(user: string): Observable<FollowModel[]> {
    return this.http.get<FollowModel[]>(`${environment.baseUrl}/follow/follower/${user}`);
  }

  public addFollow(data: FollowModel): Observable<any> {
    return this.http.post<FollowModel>(`${environment.baseUrl}/follow`, data);
  }

  public removeFollow(id: string): Observable<any> {
    return this.http.delete<FollowModel>(`${environment.baseUrl}/follow/${id}`);
  }

  // public updateFollowByProjects(data: Employee): Observable<any> {
  //   const followInfo = data.projects;
  //   return this.http.put<FollowModel>(`${environment.baseUrl}/follow`, followInfo);
  // }
}
