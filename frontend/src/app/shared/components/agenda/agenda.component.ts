import { Component, Input, OnInit } from '@angular/core';
import { AgendaOptions } from '../../const/agenda-options.const';
import { AgendaOptionsModel } from '../../models/agenda-options.model';
import { HolidayColorsModel } from '../../models/holiday-colors.model';
import { HolidayColors } from '../../const/holiday-color.const';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  public optionsAgenda: AgendaOptionsModel[];
  public optionsHoliday: HolidayColorsModel[];
  @Input()
  public isLineView: boolean;

  ngOnInit() {
    this.optionsAgenda = AgendaOptions;
    this.optionsHoliday = HolidayColors;
  }
}
