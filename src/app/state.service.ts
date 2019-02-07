import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    public currentDate: NgbDateStruct;

    constructor() {
        const date = new Date();
        this.currentDate = {
            day: date.getUTCDay(),
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
        };
    }
}
