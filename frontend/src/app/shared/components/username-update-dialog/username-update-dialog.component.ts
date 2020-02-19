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

  private username: string[] = this.data.user.username.split(' ');

  public profileForm = new FormGroup({
    f: new FormControl(this.username[0], Validators.required),
    i: new FormControl(this.username[1], Validators.required),
    o: new FormControl(this.data.user.patronymic, Validators.required)
  });

  public onUpdateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const username = `${this.profileForm.value['f']} ${this.profileForm.value['i']}`;
    const patronymic = this.profileForm.value['o'];
    this.dialogRef.close({ ...this.data.user, username, patronymic });
  }
}
