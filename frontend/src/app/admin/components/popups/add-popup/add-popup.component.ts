import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss']
})
export class AddPopupComponent {
  value: string;

  constructor(
    public dialogRef: MatDialogRef<AddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onEnter(): void {
    this.dialogRef.close(this.value);
  }
}
