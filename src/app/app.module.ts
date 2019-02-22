import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
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
import { AgendaComponent } from './agenda/agenda.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CurrentDayComponent } from './current-day/current-day.component';
import { DescriptionTableComponent } from './description/description-table/description-table.component';
import { DescriptionComponent } from './description/description.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PresenceComponent } from './presence/presence.component';
import { TaskApiService } from './services/task-api.service';
import { TeamComponent } from './team/team.component';

registerLocaleData(localeRu);
moment.locale('ru');

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
    DescriptionTableComponent
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
    { provide: TaskApiService, useClass: TaskApiInFireBaseService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
