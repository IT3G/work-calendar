import { Component, OnInit } from '@angular/core';
import { TestDataService } from './test-data.service';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'work-calendar';

  constructor(private testDataService: TestDataService, private router: Router) {}

  ngOnInit(): void {
    this.testDataService.initTestData();
  }

  onSwipe(evt) {
    const toRight = Math.abs(evt.deltaX) > 40 && evt.deltaX > 0;
    const increment = toRight === true ? -1 : 1;

    const nextRoute = AppRoutingModule.getNext(this.router, increment);
    this.router.navigate([nextRoute]);
  }
}
