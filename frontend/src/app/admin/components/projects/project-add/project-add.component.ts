import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html'
})
export class ProjectAddComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onEnter(e: KeyboardEvent): void {
    if (e.keyCode === 13) this.dialogRef.close(this.data.title);
  }
}
