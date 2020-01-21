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

  public getMyFollowing(user: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.baseUrl}/follow/following/${user}`);
  }

  public getMyRemovedFollowing(user: string): Observable<FollowModel[]> {
    return this.http.get<FollowModel[]>(`${environment.baseUrl}/follow/remove-following/${user}`);
  }

  public getMyAddedFollowing(user: string): Observable<FollowModel[]> {
    return this.http.get<FollowModel[]>(`${environment.baseUrl}/follow/add-following/${user}`);
  }

  public getMyFollowers(user: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.baseUrl}/follow/follower/${user}`);
  }

  public addFollow(data: FollowModel): Observable<any> {
    return this.http.post<FollowModel>(`${environment.baseUrl}/follow`, data);
  }

  public deleteFollow(id: string): Observable<any> {
    return this.http.delete<FollowModel>(`${environment.baseUrl}/follow/${id}`);
  }
}
