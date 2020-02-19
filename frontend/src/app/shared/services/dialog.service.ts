import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { UsernameUpdateComponent } from '../components/username-update-dialog/username-update-dialog.component';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /** Универсальный диалог подтверждения */
  confirm(question: string, width = 300): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: `${width}px`,
      data: { question }
    });

    return dialogRef.afterClosed();
  }

  /** Диалог корректировки ФИО Сотрудника */
  userNameUpdate(user: Employee, width = '50vw'): Observable<string | false> {
    const dialogRef = this.dialog.open(UsernameUpdateComponent, {
      width,
      data: { user }
    });

    return dialogRef.afterClosed();
  }
}
