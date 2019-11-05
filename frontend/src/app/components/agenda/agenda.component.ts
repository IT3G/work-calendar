import { Component, OnInit } from '@angular/core';
import { AgendaColors } from 'src/app/const/agenda-colors.const';
import { AgendaColorsModel } from 'src/app/models/agenda-colors.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  public options: AgendaColorsModel[];

  ngOnInit() {
    this.options = AgendaColors;
  }
}
