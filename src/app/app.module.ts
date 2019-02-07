import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from 'src/app/shared/pipes/date.pipe';
import { CurrentDateService } from 'src/app/store/current-date.service';
import { AgendaComponent } from './agenda/agenda.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CurrentDayComponent } from './current-day/current-day.component';
import { DescriptionComponent } from './description/description.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        CalendarComponent,
        AgendaComponent,
        DescriptionComponent,
        HeaderComponent,
        FooterComponent,
        CurrentDayComponent,
        DatePipe,
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
    exports: [DatePipe],
    providers: [CurrentDateService, DatePipe],
    bootstrap: [AppComponent],
})
export class AppModule {}
