import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right'
  };

  constructor(private snackBar: MatSnackBar) {}

  public showSuccessSnackBar(message?: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      ...this.snackBarConfig,
      panelClass: 'successSnackBar',
      data: message ? message : ''
    });
  }

  public showErrorSnackBar(message?: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      ...this.snackBarConfig,
      panelClass: 'errorSnackBar',
      data: message ? message : ''
    });
  }

  public showWarningSnackBar(message?: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      ...this.snackBarConfig,
      panelClass: 'warningSnackBar',
      data: message ? message : ''
    });
  }
}
