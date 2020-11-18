import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { TokensPayload } from 'src/app/shared/models/tokens-payload.model';

import { environment } from '../../../environments/environment';
import { AuthRequestModel } from '../../shared/models/auth.request.model';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly url = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  public login(req: AuthRequestModel): Observable<TokensPayload> {
    return this.http.post<TokensPayload>(this.url, req);
  }

  public getCurrentUser(): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/current`);
  }

  public registration(req: AuthRequestModel): Observable<Employee> {
    return this.http.post<Employee>(`${this.url}/registration`, req);
  }

  public refreshTokens(token: string): Observable<TokensPayload> {
    return this.http.post<TokensPayload>(`${this.url}/token`, { token });
  }
}
