import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';

/** Диалог для корректировки ФИО Сотрудника */
@Component({
  selector: 'app-username-update-dialog',
  templateUrl: './username-update-dialog.component.html',
  styleUrls: ['./username-update-dialog.component.scss']
})
export class UsernameUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<UsernameUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Employee }
  ) {}

  public profileForm = new FormGroup({
    patronymic: new FormControl(this.data.user.patronymic, Validators.required)
  });

  public onUpdateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const patronymic = this.profileForm.value['patronymic'];
    this.dialogRef.close({ ...this.data.user, patronymic });
  }
}
