import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import * as moment from 'moment';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthApiService } from './core/services/auth-api.service';
import { CustomDateAdapter } from './core/services/custom-date-adapter.service';
import { AuthApiInBackendService } from './core/services/impl/backend/auth-api-in-backend.service';
import { LoginModule } from './login/login.module';
import { PresenseModule } from './presense/presense.module';
import { PrintVacationModule } from './print-vacation/print-vacation.module';
import { ProfileModule } from './profile/profile.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppLoadService } from './shared/services/app-load.service';
import { SharedModule } from './shared/shared.module';
import { TeamPresenseModule } from './team-presense/team-presense.module';

registerLocaleData(localeRu);
moment.locale('ru');

export function onInit(appLoadService: AppLoadService) {
  return () => appLoadService.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    CoreModule,
    PresenseModule,
    ProfileModule,
    TeamPresenseModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PrintVacationModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: onInit, deps: [AppLoadService], multi: true },
    { provide: AuthApiService, useClass: AuthApiInBackendService },
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
