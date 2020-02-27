import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/shared/models/employee.model';
import { incline } from 'lvovich';

/** Диалог для корректировки ФИО Сотрудника */
@Component({
  selector: 'app-username-update-dialog',
  templateUrl: './username-update-dialog.component.html',
  styleUrls: ['./username-update-dialog.component.scss']
})
export class UsernameUpdateComponent {
  private name: string;
  private surname: string;
  private patronymic: string;
  private nameFrom: string;
  private surnameFrom: string;
  private patronymicFrom: string;
  public profileForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UsernameUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Employee }
  ) {
    const firstLast = data.user.username.split(' ');

    this.name = firstLast[1];
    this.surname = firstLast[0];
    this.patronymic = data.user.patronymic;

    const formatEmployee = incline({ last: firstLast[0], first: firstLast[1], middle: this.patronymic }, 'genitive');
    this.nameFrom = formatEmployee.first;
    this.surnameFrom = formatEmployee.last;
    this.patronymicFrom = formatEmployee.middle;

    this.profileForm = new FormGroup({
      name: new FormControl({ value: this.name, disabled: true }, Validators.required),
      surname: new FormControl({ value: this.surname, disabled: true }, Validators.required),
      patronymic: new FormControl(this.patronymic, Validators.required),
      nameFrom: new FormControl(this.nameFrom, Validators.required),
      surnameFrom: new FormControl(this.surnameFrom, Validators.required),
      patronymicFrom: new FormControl(this.patronymicFrom, Validators.required)
    });
  }

  public onUpdateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const result = {
      surname: this.profileForm.controls['surname'].value,
      name: this.profileForm.controls['name'].value,
      patronymic: this.profileForm.controls['patronymic'].value,
      surnameFrom: this.profileForm.controls['surnameFrom'].value,
      nameFrom: this.profileForm.controls['nameFrom'].value,
      patronymicFrom: this.profileForm.controls['patronymicFrom'].value
    };

    this.dialogRef.close(result);
  }

  public patronymicChange() {
    const currentSurname = this.profileForm.controls['patronymic'].value;
    const surnameTo = incline({ middle: currentSurname }, 'genitive').middle;

    this.profileForm.controls['patronymicFrom'].setValue(surnameTo);
  }
}
