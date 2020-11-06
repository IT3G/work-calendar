import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Module } from 'module';

import { DictionaryModel } from '../../../../shared/models/dictionary.model';

@Component({
  selector: 'app-add-popup',
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
      console.log(this.projectList);
      this.projectList = this.data.value;
    }
    console.log(this.projectList);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onEnter(): void {
    if (this.data.value) {
      this.dialogRef.close({ ...this.projectControl.value });
    } else {
      this.dialogRef.close(null);
    }
  }
}
