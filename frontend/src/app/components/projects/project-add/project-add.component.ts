import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
