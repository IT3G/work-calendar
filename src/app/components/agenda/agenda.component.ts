import { Component, OnInit } from '@angular/core';
import { AgendaColors } from 'src/app/const/agenda-colors.const';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  public options: any[];

  constructor() {}

  ngOnInit() {
    this.options = AgendaColors;
  }
}
