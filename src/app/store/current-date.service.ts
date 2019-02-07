import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CurrentDateService {
    private currentDate = new BehaviorSubject<any>(moment());
    constructor() {}

    public setCurrentDate(date: any) {
        this.currentDate.next(date);
    }
    public reset(): void {
        this.currentDate.next(null);
    }
    public getDate(): Observable<any> {
        return this.currentDate;
    }
}
