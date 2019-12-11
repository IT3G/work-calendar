import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { mockYears } from '../../holidays/mock-data';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-holidays',
  templateUrl: './add-holidays.component.html',
  styleUrls: ['./add-holidays.component.scss']
})
export class AddHolidaysComponent implements OnInit {
  public years = mockYears;
  public form: FormGroup;

  public fileType = '.csv';
  public buttonText = 'Загрузить файл';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddHolidaysComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      year: [undefined],
      // year: [undefined, [Validators.required]],
      file: [undefined, [Validators.required]]
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onEnter(): void {
    this.dialogRef.close(this.form.value);
  }
}
