import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentDateService } from 'src/app/store/current-date.service';
import { StateService } from '../state.service';

@Component({
    selector: 'app-current-day',
    templateUrl: './current-day.component.html',
    styleUrls: ['./current-day.component.css'],
})
export class CurrentDayComponent implements OnInit {
    stateService: StateService;
    currentDate$: Observable<any>;

    constructor(private currentDateService: CurrentDateService) {}

    ngOnInit() {
        this.currentDate$ = this.currentDateService.getDate();
    }
}
