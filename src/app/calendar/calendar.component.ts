import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CurrentDateService } from 'src/app/store/current-date.service';
import { StateService } from './../state.service';
const now = new Date();

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
    constructor(private currentDateService: CurrentDateService) {}

    model: NgbDateStruct;

    stateService: StateService;

    ngOnInit() {}

    public selectToday() {
        this.model = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
        };
    }

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: { month: number }) {
        return date.month !== current.month;
    }

    hasTask(date: NgbDateStruct) {
        return this.dateHasTask(date);
    }

    showTasks(date: NgbDateStruct) {
        if (this.dateHasTask(date)) {
            // TODO show popup
            alert(date.day);
            // this.stateService.currentDate = date;
        }
    }

    public selectDate(date: NgbDateStruct) {
        const momentDate: NgbDateStruct = {
            day: date.day,
            month: date.month - 1,
            year: date.year,
        };
        const obj = moment(momentDate);

        this.currentDateService.setCurrentDate(obj);
    }

    dateHasTask(date: NgbDateStruct): boolean {
        return true;
        // for (var i = 0; i < this.userService.user.tasks.length; i++) {
        //   var taskDate = new Date(this.userService.user.tasks[i].date);
        //   var day: number = taskDate.getDate();
        //   var month: number = taskDate.getMonth() + 1;
        //   var year: number = taskDate.getFullYear();

        //   if (day === date.day && month === date.month && year === date.year) {
        //     return true;
        //   }
        //  }
    }
}
