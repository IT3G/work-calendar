import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContextStoreService } from '../store/context-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<string>;

  constructor(private router: Router, private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.currentUser$ = this.contextStoreService.getCurrentUser$();
  }
}
