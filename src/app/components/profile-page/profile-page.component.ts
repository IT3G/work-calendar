import { AuthService } from 'src/app/services/auth.service';
import { Employee } from './../../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeStoreService } from '../../store/employee-store.service';
import { ContextStoreService } from '../../store/context-store.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  employees$: Observable<Employee[]>;
  selectedUser$: Observable<Employee>;
  id: number;

  constructor(
    private employeeStoreService: EmployeeStoreService,
    private contextStoreService: ContextStoreService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.id = Number(this.route.snapshot.params.id);
    } else {
      this.id = this.contextStoreService.getSelectedUser().id;
    }

    this.selectedUser$ = this.employeeStoreService.employees$.pipe(
      filter(i => !!i),
      map(o => {
        return o.find(i => i.id === this.id);
      })
    );
  }
}
