import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryModel } from '../../../../shared/models/dictionary.model';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss']
})
export class AddPopupComponent implements OnInit {
  value: string;

  constructor(
    public dialogRef: MatDialogRef<AddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: DictionaryModel }
  ) {}

  ngOnInit() {
    if (this.data.value) {
      this.value = this.data.value.name;
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onEnter(): void {
    if (this.data.value) {
      this.dialogRef.close({ ...this.data.value, name: this.value });
    } else {
      this.dialogRef.close({ name: this.value });
    }
  }
}
