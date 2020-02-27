import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ToggleButtonData } from '../radio-button-group/radio-button-group.component';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {
  @Input()
  public data: ToggleButtonData;

  @HostBinding('style.--color')
  public get isExample(): string {
    return this.data && this.data.color;
  }

  @Input()
  defaultChoice: string;

  @Input()
  idForLabel: string;

  @Input()
  groupName: string;

  @Output() valueChosen: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public choose($event) {
    this.valueChosen.emit($event.target.value);
  }
}
