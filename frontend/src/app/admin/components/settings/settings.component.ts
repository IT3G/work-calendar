import { Component, OnInit } from '@angular/core';
import { InputFile } from 'ngx-input-file';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ConfigurationApiService } from '../../../core/services/configuration-api.service';
import { ContextStoreService } from '../../../core/store/context-store.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  files: InputFile[];
  logoName$: Observable<string>;
  baseUrl = environment.baseUrl;

  constructor(private configApi: ConfigurationApiService, private context: ContextStoreService) {}

  ngOnInit() {
    this.logoName$ = this.context.settings$.pipe(
      filter(s => !!s),
      map(s => s.LOGO_NAME)
    );
  }

  addLogo(file: InputFile) {
    if (!file) {
      return;
    }

    this.configApi
      .setLogo(file)
      .subscribe(res =>
        this.context.settings$.next({ ...this.context.settings$.value, LOGO_NAME: this.files[0].file.name })
      );
  }
}
