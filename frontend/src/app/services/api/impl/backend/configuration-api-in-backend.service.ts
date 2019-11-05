import { Injectable } from '@angular/core';
import { ConfigModel } from 'src/app/models/config.model';
import { ConfigurationApiService } from '../../configuration-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationApiInBackendService implements ConfigurationApiService {
  constructor() {}

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
