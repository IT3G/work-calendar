import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss']
})
export class CurrentDayComponent implements OnInit {
  currentDate$: Observable<any>;
  currentUser$: Observable<string>;
  selectedUser$: Observable<Employee>;

  constructor(private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.currentDate$ = this.contextStoreService.getCurrentDate$();
    this.selectedUser$ = this.contextStoreService.getSelectedUser$();
  }
}
