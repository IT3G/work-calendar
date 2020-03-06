import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputFile } from 'ngx-input-file';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
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
  isLogoDisabled$: Observable<boolean>;
  settingsForm: FormGroup;

  constructor(
    private configApi: ConfigurationApiService,
    private context: ContextStoreService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initSettingsForm();
    this.logoName$ = this.context.settings$.pipe(
      filter(s => !!s),
      map(s => s.LOGO_NAME)
    );

    this.isLogoDisabled$ = this.context.settings$.pipe(map(s => s?.FEATURE_FILE_STORAGE === 'NO'));
  }

  updateSettings() {
    this.configApi.updateSettings(this.settingsForm.getRawValue()).subscribe(s => this.context.settings$.next(s));
  }

  deleteLogo() {
    this.configApi.deleteLogo().subscribe(() => {
      this.files = [];
      this.context.settings$.next({ ...this.context.settings$.value, LOGO_NAME: null });
    });
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

  private initSettingsForm(): void {
    this.settingsForm = this.fb.group({
      title: ''
    });

    this.context.settings$
      .pipe(
        filter(s => !!s),
        first()
      )
      .subscribe(s => this.settingsForm.patchValue({ title: s.TITLE }));
  }
}
