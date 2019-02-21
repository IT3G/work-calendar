import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from 'src/app/models/tasks.models';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-description-table',
  templateUrl: './description-table.component.html',
  styleUrls: ['./description-table.component.scss']
})
export class DescriptionTableComponent implements OnInit {
  tasks$: Observable<TaskModel[]>;
  displayedColumns: string[];
  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.displayedColumns = ['dateStart', 'id', 'timeStamp'];
    this.tasks$ = this.crudService.getTasks();
  }
}
