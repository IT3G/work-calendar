import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right'
  };

  constructor(private snackBar: MatSnackBar) {}

  public showSuccessSnackBar(message?: string): void {
    this.snackBar.open(message ? message : '', null, {
      ...this.snackBarConfig,
      panelClass: 'successSnackBar'
    });
  }

  public showErrorSnackBar(message?: string): void {
    this.snackBar.open(message ? message : '', null, {
      ...this.snackBarConfig,
      panelClass: 'errorSnackBar'
    });
  }

  public showWarningSnackBar(message?: string): void {
    this.snackBar.open(message ? message : '', null, {
      ...this.snackBarConfig,
      panelClass: 'warningSnackBar'
    });
  }
}
