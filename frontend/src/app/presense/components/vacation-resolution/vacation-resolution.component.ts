import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vacation-resolution',
  templateUrl: './vacation-resolution.component.html',
  styleUrls: ['./vacation-resolution.component.scss']
})
export class VacationResolutionComponent {
  files: File[];

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
}
