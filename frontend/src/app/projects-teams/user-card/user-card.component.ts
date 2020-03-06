import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ContextStoreService } from '../../core/store/context-store.service';
import { Employee } from '../../shared/models/employee.model';
import { SettingsModel } from '../../shared/models/settings.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input()
  user: Employee;

  public settings$: Observable<SettingsModel>;

  constructor(private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.settings$ = this.contextStoreService.settings$.pipe(filter(s => !!s));
  }
}
