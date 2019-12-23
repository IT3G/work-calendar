import { Component, Input, OnInit } from '@angular/core';
import { AgendaColors } from '../../const/agenda-colors.const';
import { AgendaColorsModel } from '../../models/agenda-colors.model';
import { HolidayColorsModel } from '../../models/holiday-colors.model';
import { HolidayColors } from '../../const/holiday-color.const';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  public optionsAgenda: AgendaColorsModel[];
  public optionsHoliday: HolidayColorsModel[];
  @Input()
  public isLineView: boolean;

  ngOnInit() {
    this.optionsAgenda = AgendaColors;
    this.optionsHoliday = HolidayColors;
  }
}
