import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ContextStoreService } from '../../store/context-store.service';
import { EmployeeStoreService } from '../../store/employee-store.service';
import { Employee } from './../../models/employee.model';

@Component({
  selector: 'app-team',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  authInfo$: Observable<any>;
  employees$: Observable<Employee[]>;
  selectedUser$: Observable<Employee>;
  id: number;

  constructor(
    private employeeStoreService: EmployeeStoreService,
    private contextStoreService: ContextStoreService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getId();

    this.authInfo$ = this.authService.getUser();

    this.selectedUser$ = this.employeeStoreService.employees$.pipe(
      filter(i => !!i),
      map(o => {
        return o.find(i => i.id === this.id);
      })
    );
  }

  private getId() {
    if (this.route.snapshot.params.id) {
      this.id = Number(this.route.snapshot.params.id);
    } else {
      this.id = this.contextStoreService.getSelectedUser().id;
    }
  }
}
