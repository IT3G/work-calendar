import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';
import { Observable } from 'rxjs';
import { AuthSetting } from '../../shared/models/auth-setting.model';
import { filter } from 'rxjs/operators';
import { ContextStoreService } from '../../core/store/context-store.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input()
  user: Employee;

  public settings$: Observable<AuthSetting>;


  constructor(private contextStoreService: ContextStoreService
  ) {
  }

  ngOnInit() {
    this.settings$ = this.contextStoreService.settings$.pipe(
      filter(s => !!s)
    );
  }
}
