import { Component, Inject, Optional } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Optional()
    @Inject(MAT_SNACK_BAR_DATA)
    public data: any
  ) {}

  public dismissSnackbar(): void {
    this.snackBarRef.dismiss();
  }
}
