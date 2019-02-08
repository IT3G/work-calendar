import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatesStoreService } from 'src/app/store/dates-store.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss']
})
export class CurrentDayComponent implements OnInit {
  stateService: StateService;
  currentDate$: Observable<any>;

  constructor(private datesStoreService: DatesStoreService) {}

  ngOnInit() {
    this.currentDate$ = this.datesStoreService.getDateStart();
  }
}
