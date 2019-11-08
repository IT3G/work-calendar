import { Component, OnInit } from '@angular/core';
import { AgendaColors } from '../../../shared/const/agenda-colors.const';
import { AgendaColorsModel } from '../../../shared/models/agenda-colors.model';

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
