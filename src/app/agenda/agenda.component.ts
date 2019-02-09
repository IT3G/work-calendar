import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  public options: any[];
  constructor() {}

  ngOnInit() {
    this.options = [
      {
        title: 'Стандартно',
        id: 1,
        color: 'white'
      },
      {
        title: 'Особое',
        id: 2,
        color: 'cyan'
      },
      {
        title: 'Отсутствие',
        id: 3,
        color: 'red'
      },
      {
        title: 'Отпуск',
        id: 4,
        color: 'green'
      },
      {
        title: 'Болезнь',
        id: 5,
        color: 'yellow'
      }
    ];
  }
}
