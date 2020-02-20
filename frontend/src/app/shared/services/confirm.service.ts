import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor(private dialog: MatDialog) {}

  openDialog(question: string, width = 300): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: `${width}px`,
      data: { question }
    });

    return dialogRef.afterClosed();
  }
}
