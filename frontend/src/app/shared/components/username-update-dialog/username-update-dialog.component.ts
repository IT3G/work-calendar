import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/** Диалог для корректировки ФИО Сотрудника */
@Component({
  selector: 'app-username-update-dialog',
  templateUrl: './username-update-dialog.component.html',
  styleUrls: ['./username-update-dialog.component.scss']
})
export class UsernameUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<UsernameUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string }
  ) {}

  private fio: string[] = this.data.username.split(' ');

  public profileForm = new FormGroup({
    f: new FormControl(this.fio[0], Validators.required),
    i: new FormControl(this.fio[1], Validators.required),
    o: new FormControl(this.fio[2], Validators.required)
  });

  public onUpdateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const username = `${this.profileForm.value['f']} ${this.profileForm.value['i']} ${this.profileForm.value['o']}`;
    this.dialogRef.close(username);
  }
}
