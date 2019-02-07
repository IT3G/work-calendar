import { Component, OnInit, Inject } from '@angular/core';
import { StateService } from '../state.service';

@Component({
    selector: 'app-current-day',
    templateUrl: './current-day.component.html',
    styleUrls: ['./current-day.component.css'],
})
export class CurrentDayComponent implements OnInit {
    stateService: StateService;

    constructor() {}

    ngOnInit() {}
}
