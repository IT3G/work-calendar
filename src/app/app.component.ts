import { Component, OnInit } from '@angular/core';
import { TestDataService } from './test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'work-calendar';

  constructor(private testDataService: TestDataService) {}

  ngOnInit(): void {
    this.testDataService.initTestData();
  }
}
