import { Component, Input, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss']
})
export class CurrentDayComponent implements OnInit {
  currentDate$: Observable<Moment>;
  currentUser$: Observable<string>;

  @Input()
  selectedUser: Employee;

  constructor(private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.currentDate$ = this.contextStoreService.getCurrentDate$();
  }
}
