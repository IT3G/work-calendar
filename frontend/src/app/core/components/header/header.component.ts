import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../../shared/models/employee.model';
import { ContextStoreService } from '../../store/context-store.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() mobileMenuClick = new EventEmitter<void>();

  public currentUser$: Observable<Employee>;
  public isMobile: boolean;

  constructor(
    private router: Router,
    private contextStoreService: ContextStoreService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.currentUser$ = this.contextStoreService.getCurrentUser$();

    this.breakpointObserver.observe(['(max-width: 860px)']).subscribe((result: BreakpointState) => {
      this.isMobile = result.matches;
    });
  }
}
