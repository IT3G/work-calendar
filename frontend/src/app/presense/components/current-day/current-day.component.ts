import { Component, Input, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { ContextStoreService } from '../../../core/store/context-store.service';
import { Employee } from '../../../shared/models/employee.model';
import { AuthSetting } from '../../../shared/models/auth-setting.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss']
})
export class CurrentDayComponent implements OnInit {
  currentDate$: Observable<Moment>;
  public settings$: Observable<AuthSetting>;

  @Input()
  selectedUser: Employee;


  constructor(private contextStoreService: ContextStoreService) {
  }

  ngOnInit() {
    this.currentDate$ = this.contextStoreService.getCurrentDate$();
    this.settings$ = this.contextStoreService.settings$.pipe(
      filter(s => !!s)
    );
  }
}
