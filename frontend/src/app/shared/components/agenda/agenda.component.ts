import { Component, Input, OnInit } from '@angular/core';
import { AgendaColors } from '../../const/agenda-colors.const';
import { AgendaColorsModel } from '../../models/agenda-colors.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  public options: AgendaColorsModel[];
  @Input()
  public isLineView: boolean;

  ngOnInit() {
    this.options = AgendaColors;
  }
}
