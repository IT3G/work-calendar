import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  // private snackBarConfig: MatSnackBarConfig = {
  // duration: 5000
  // horizontalPosition: 'right',
  // verticalPosition: 'top',
  // panelClass: ['commonSnackBar']
  // };

  constructor(private snackBar: MatSnackBar) {}

  public showSuccessSnackBar(message?: string) {
    this.snackBar.open(message ? message : '', null, {
      duration: 5000,
      panelClass: 'successSnackBar'
    });
  }

  public showErrorSnackBar(message?: string) {
    this.snackBar.open(message ? message : '', null, {
      duration: 5000,
      panelClass: 'errorSnackBar'
    });
  }

  public showWarningSnackBar(message?: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      panelClass: 'errorSnackBar',
      data: message ? message : ''
    });
  }
}
