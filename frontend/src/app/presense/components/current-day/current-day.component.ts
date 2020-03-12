import { Component, Input, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ContextStoreService } from '../../../core/store/context-store.service';
import { Employee } from '../../../shared/models/employee.model';
import { SettingsModel } from '../../../shared/models/settings.model';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss']
})
export class CurrentDayComponent implements OnInit {
  currentDate$: Observable<Moment>;
  public settings$: Observable<SettingsModel>;

  @Input()
  selectedUser: Employee;

  constructor(private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.currentDate$ = this.contextStoreService.getCurrentDate$();
    this.settings$ = this.contextStoreService.settings$.pipe(filter(s => !!s));
  }
}
