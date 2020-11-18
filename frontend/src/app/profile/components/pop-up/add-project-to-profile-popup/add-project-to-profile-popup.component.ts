import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DictionaryModel } from '../../../../shared/models/dictionary.model';

@Component({
  selector: 'app-add-project-to-profile-popup',
  templateUrl: './add-project-to-profile-popup.component.html',
  styleUrls: ['./add-project-to-profile-popup.component.scss'],
})
export class AddProjectToProfilePopupComponent implements OnInit {
  public projectList: DictionaryModel[];

  public projectControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AddProjectToProfilePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: DictionaryModel[] }
  ) {}

  ngOnInit() {
    if (this.data.value) {
      this.projectList = this.data.value;
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onEnter(): void {
    const selectedProject = this.data.value.find((project) => project._id === this.projectControl.value);
    this.dialogRef.close(selectedProject);
  }
}
