import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule, APP_INITIALIZER } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
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
import { TaskApiInFireBaseService } from 'src/app/services/impl/task-api-in-firebase.service';
import { DatePipe } from 'src/app/shared/pipes/date.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { fireBaseConfigEnvironment } from 'src/environments/firebaseConfig';
import { environment } from '../environments/environment';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CurrentDayComponent } from './components/current-day/current-day.component';
import { DescriptionHistoryComponent } from './components/description-history/description-history.component';
import { DescriptionComponent } from './components/description/description.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PresenceComponent } from './components/presence/presence.component';
import { TaskApiService } from './services/task-api.service';
import { TeamComponent } from './components/team/team.component';
import { EmployeeApiInMemoryService } from './services/impl/employee-api-in-memory.service';
import { EmployeeApiService } from './services/employee-api.service';
import { AppLoadService } from './app-load.service';

registerLocaleData(localeRu);
moment.locale('ru');

function onInit(appLoadService: AppLoadService) {
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
    TeamComponent,
    PresenceComponent,
    DescriptionHistoryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(fireBaseConfigEnvironment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    RouterModule
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
