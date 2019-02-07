import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar/calendar.component';
import { AgendaComponent } from './agenda/agenda.component';
import { DescriptionComponent } from './description/description.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CurrentDayComponent } from './current-day/current-day.component';

@NgModule({
    declarations: [
        AppComponent,
        CalendarComponent,
        AgendaComponent,
        DescriptionComponent,
        HeaderComponent,
        FooterComponent,
        CurrentDayComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
