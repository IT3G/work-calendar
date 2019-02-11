import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DatesStoreService } from 'src/app/store/dates-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private datesStoreService: DatesStoreService, private crudService: CrudService) {}
  ngOnInit() {
    this.getInfoFromFirebase();
  }

  private getInfoFromFirebase(): void {
    this.crudService.getTasks().subscribe(res => {
      this.datesStoreService.setTasks(res);
    });
  }
}
