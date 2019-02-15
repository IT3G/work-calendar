import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextStoreService } from 'src/app/store/context-store.service';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss']
})
export class CurrentDayComponent implements OnInit {
  currentDate$: Observable<any>;

  constructor(private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.currentDate$ = this.contextStoreService.getCurrentDate();
  }
}
