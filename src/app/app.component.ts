import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { TestDataService } from './test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private testDataService: TestDataService,
    private crudService: CrudService,
    private tasksStoreService: TasksStoreService
  ) {}
  title = 'work-calendar';
  ngOnInit(): void {
    this.testDataService.initTestData();

    this.getInfoFromFirebase();
  }

  private getInfoFromFirebase(): void {
    this.crudService.getTasks().subscribe(res => console.log(res));
  }
}
