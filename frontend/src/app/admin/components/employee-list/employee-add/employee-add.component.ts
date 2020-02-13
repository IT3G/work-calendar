import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html'
})
export class EmployeeAddComponent {
  constructor(
    public dialogRef: MatDialogRef<EmployeeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { login: string }
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onEnter(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.dialogRef.close(this.data.login);
    }
  }
}
