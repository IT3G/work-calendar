import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AvatarModule } from 'ngx-avatar';
import { NavigationMenuComponent } from 'src/app/components/navigation-menu/navigation-menu.component';
import { RegisterPageComponent } from 'src/app/components/register-page/register-page.component';
import { TeamPresencePageComponent } from 'src/app/components/team-presence-page/team-presence-page.component';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { TaskApiInFireBaseService } from 'src/app/services/api/impl/firebase/task-api-in-firebase.service';
// import { SharedModule } from 'src/app/shared.module';
import { fireBaseConfigEnvironment } from 'src/environments/firebaseConfig';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CurrentDayComponent } from './components/current-day/current-day.component';
import { DescriptionHistoryComponent } from './components/description-history/description-history.component';
import { DescriptionComponent } from './components/description/description.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PresencePageComponent } from './components/presence-page/presence-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { MaterialModule } from './material.module';
import { EmployeeApiService } from './services/api/employee-api.service';
import { EmployeeApiInMemoryService } from './services/api/impl/in-memory/employee-api-in-memory.service';
import { TaskApiService } from './services/api/task-api.service';
import { AppLoadService } from './services/app-load.service';

registerLocaleData(localeRu);
moment.locale('ru');

export function onInit(appLoadService: AppLoadService) {
  return () => appLoadService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AgendaComponent,
    DescriptionComponent,
    HeaderComponent,
    FooterComponent,
    CurrentDayComponent,
    ProfilePageComponent,
    PresencePageComponent,
    DescriptionHistoryComponent,
    RegisterPageComponent,
    LoginPageComponent,
    TeamPresencePageComponent,
    NavigationMenuComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(fireBaseConfigEnvironment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule,
    AvatarModule
  ],
  exports: [],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: TaskApiService, useClass: TaskApiInFireBaseService },
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: EmployeeApiService, useClass: EmployeeApiInMemoryService },
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: onInit, deps: [AppLoadService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
