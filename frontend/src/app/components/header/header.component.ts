import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutingModule } from '../../app-routing.module';
import { Employee } from '../../models/employee.model';
import { ContextStoreService } from '../../store/context-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  mobileMenuClick = new EventEmitter<void>();

  currentUser$: Observable<Employee>;

  constructor(private router: Router, private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.currentUser$ = this.contextStoreService.getCurrentUser$();
  }

  onSwipe(evt: { deltaX: number }) {
    const toRight = Math.abs(evt.deltaX) > 40 && evt.deltaX > 0;
    const increment = toRight === true ? -1 : 1;

    const nextRoute = AppRoutingModule.getNext(this.router, increment);
    this.router.navigate([nextRoute]);
  }
}
