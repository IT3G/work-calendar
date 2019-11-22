import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigModel } from '../../shared/models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationApiService {
  constructor(private http: HttpClient) {}

  public loadSettings(): Observable<any> {
    return this.http.get<any>('backend/settings');
  }

  public getConfig() {
    const mockForm: ConfigModel = {
      DATABASE_USER: 'admin',
      DATABASE_PASSWORD: 'admin',
      DATABASE_URL: 'https://mongodb.com',
      MAIL_HOST: 'https://mail.test.ru/',
      APP_PORT: 9696,
      MAIL_SENDER_NAME: 'Тестов Тест',
      MAIL_SENDER_ADDRESS: 'test@it2g.ru',
      LDAP_FILTER: 'mock',
      MAIL_PREFIX: '@it2g.ru',
      READER_DOMAIN_NAME: 'CN=mock,OU=mock,OU=mock,DC=mock,DC=mock',
      READER_PASSWORD: 'mock',
      SERVER_URL: 'mock',
      SUFFIX: 'OU=mock,OU=mock,DC=mock,DC=mock'
    };

    return mockForm;
  }

  public updateConfig() {}
}
