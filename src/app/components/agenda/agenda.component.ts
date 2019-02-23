import { AgendaColors } from './../../shared/const/agenda-colors.const';
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
    this.options = AgendaColors;
  }
}
