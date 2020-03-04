import { Component } from '@angular/core';
import { InputFile } from 'ngx-input-file';
import { Observable } from 'rxjs';
import { ConfigurationApiService } from '../../../core/services/configuration-api.service';
import { ContextStoreService } from '../../../core/store/context-store.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  files: InputFile[];
  logoName: Observable<string>;

  constructor(private configApi: ConfigurationApiService, private context: ContextStoreService) {}

  addFile() {
    if (!this.files || !this.files.length) {
      return;
    }

    this.configApi
      .setLogo(this.files[0])
      .subscribe(res =>
        this.context.settings$.next({ ...this.context.settings$.value, LOGO_NAME: this.files[0].file.name })
      );
  }
}
