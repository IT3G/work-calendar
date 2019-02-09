import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input()
  options: any[];
  @Input()
  label: string;
  @Input()
  control: FormControl;
  constructor() {}

  ngOnInit() {}
}
