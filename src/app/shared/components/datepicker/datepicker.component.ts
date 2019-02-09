import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @Input()
  model: any;
  @Output()
  onChangeDateEmit: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.log(this.model);
  }

  public changeDateEvent(): void {
    this.onChangeDateEmit.emit(this.model);
  }
}
