import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthSetting } from '../../shared/models/auth-setting.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationApiService {
  constructor(private http: HttpClient) {}

  public loadSettings(): Observable<AuthSetting> {
    return this.http.get<AuthSetting>(`${environment.baseUrl}/settings`);
  }
}
