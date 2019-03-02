import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutingModule } from '../../app-routing.module';
import { Employee } from '../../models/employee.model';
import { ContextStoreService } from '../../store/context-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<Employee>;

  constructor(
    private router: Router,
    private contextStoreService: ContextStoreService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser$ = this.contextStoreService.getCurrentUser$();
  }

  selectCurrentUser() {
    this.contextStoreService.setSelectedUser(this.contextStoreService.getCurrentUser());
  }

  onSwipe(evt) {
    const toRight = Math.abs(evt.deltaX) > 40 && evt.deltaX > 0;
    const increment = toRight === true ? -1 : 1;

    const nextRoute = AppRoutingModule.getNext(this.router, increment);
    this.router.navigate([nextRoute]);
  }

  logout() {
    this.authService.logout();
  }
}
