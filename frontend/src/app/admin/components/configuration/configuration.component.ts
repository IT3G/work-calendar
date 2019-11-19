import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationApiService } from '../../../core/services/configuration-api.service';
import { ConfigModel } from '../../../shared/models/config.model';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  public configForm: FormGroup;
  private config: ConfigModel;

  constructor(private configurationApiService: ConfigurationApiService) {}

  ngOnInit() {
    this.config = this.configurationApiService.getConfig();
    this.initForm(this.config);
  }

  public onSaveConfig() {
    console.log('Делаю вид что сохраняю конфиг');
  }

  private initForm(initConfig: ConfigModel) {
    this.configForm = new FormGroup({
      dbUser: new FormControl(initConfig.DATABASE_USER, Validators.required),
      dbPassowrd: new FormControl(initConfig.DATABASE_PASSWORD, Validators.required),
      dbUrl: new FormControl(initConfig.DATABASE_URL, Validators.required),
      mailHost: new FormControl(initConfig.MAIL_HOST, Validators.required),
      appPort: new FormControl(initConfig.APP_PORT, Validators.required),
      mailSenderName: new FormControl(initConfig.MAIL_SENDER_NAME, Validators.required),
      mailSenderAdress: new FormControl(initConfig.MAIL_SENDER_ADDRESS, Validators.required),
      ldapFilter: new FormControl(initConfig.LDAP_FILTER, Validators.required),
      mailPrefix: new FormControl(initConfig.MAIL_PREFIX, Validators.required),
      readerDomainName: new FormControl(initConfig.READER_DOMAIN_NAME, Validators.required),
      readerPassword: new FormControl(initConfig.READER_PASSWORD, Validators.required),
      serverUrl: new FormControl(initConfig.SERVER_URL, Validators.required),
      suffix: new FormControl(initConfig.SUFFIX, Validators.required)
    });
  }
}
