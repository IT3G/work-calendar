import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input()
  ddPanelPosition: string;

  public isOpen;

  ngOnInit(): void {
    this.isOpen = false;
  }

  public toggleDropDownPanel() {
    this.isOpen = !this.isOpen;
  }

  public hideDropDownPanel() {
    this.isOpen = false;
  }
}
