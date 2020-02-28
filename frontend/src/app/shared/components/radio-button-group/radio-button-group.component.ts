import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { radioButtonGroupCommonColor } from '../../const/subdivision-colors.const';

export interface ToggleButtonData {
  title: string;
  color: string;
  value: string;
}

@Component({
  selector: 'app-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss']
})
export class RadioButtonGroupComponent implements OnInit {
  @Input()
  data: ToggleButtonData[];

  @Input()
  defaultChoice: string;

  @Input()
  groupName: string;

  public first = radioButtonGroupCommonColor[0];
  public last = radioButtonGroupCommonColor[1];
  public control: string;

  @Output() valueChosen: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.control = this.defaultChoice ? this.defaultChoice : radioButtonGroupCommonColor[0].value;
  }

  public onButtonEmit(value: string) {
    this.control = value;
    this.valueChosen.emit(value);
  }
}
