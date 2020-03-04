import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public fileType = '.jpg, .png, .gif';
  public buttonText = 'Загрузить логотип';
  files: File[];
}
