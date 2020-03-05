import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Employee } from '../../../shared/models/employee.model';
import { ContextStoreService } from '../../store/context-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() mobileMenuClick = new EventEmitter<void>();

  public currentUser$: Observable<Employee>;
  public isMobile: boolean;
  public baseUrl = environment.baseUrl;
  public logoName$: Observable<string>;

  constructor(private contextStoreService: ContextStoreService, public breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.currentUser$ = this.contextStoreService.getCurrentUser$();
    this.logoName$ = this.contextStoreService.settings$.pipe(
      filter(s => !!s),
      map(s => s.LOGO_NAME)
    );

    this.breakpointObserver.observe(['(max-width: 860px)']).subscribe(result => (this.isMobile = result.matches));
  }
}
