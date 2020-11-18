import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confrim-popup',
  templateUrl: './delete-confrim-popup.component.html',
  styleUrls: ['./delete-confrim-popup.component.scss'],
})
export class DeleteConfrimPopupComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfrimPopupComponent>) {}

  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  public onEnter(): void {
    this.dialogRef.close(true);
  }
}
