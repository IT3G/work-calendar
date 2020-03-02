import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public fileType = '.jpg, .png, .gif';
  public buttonText = 'Загрузить логотип';
  public fileControl: FormControl;

  file: File;

  imageUrl: string | ArrayBuffer;
  imageWidth: string;
  fileName = 'No file selected';

  constructor() {}

  ngOnInit(): void {
    this.fileControl = new FormControl();

    this.fileControl.valueChanges.subscribe(file => {
      if (!file) {
        this.imageUrl = '';
        this.imageWidth = '0';
      }
      if (file) {
        this.fileName = file.name;
        this.file = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = event => {
          this.imageUrl = reader.result;
        };
      }
    });
  }
}
