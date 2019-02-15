import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from 'src/app/shared/pipes/date.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from '../environments/environment';
import { AgendaComponent } from './agenda/agenda.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CurrentDayComponent } from './current-day/current-day.component';
import { DescriptionComponent } from './description/description.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { LOCALE_ID } from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import { TeamComponent } from './team/team.component';
import { PresenceComponent } from './presence/presence.component';
import * as moment from 'moment';

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
    PresenceComponent
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
    RouterModule
  ],
  exports: [],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }, { provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
