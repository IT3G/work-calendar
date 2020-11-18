import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DictionaryModel } from '../../../../shared/models/dictionary.model';
import { DateInterface } from '../../profile-projects/profile-projects.component';

@Component({
  selector: 'app-add-month-to-profile-project-popup',
  templateUrl: './add-month-to-profile-project-popup.component.html',
  styleUrls: ['./add-month-to-profile-project-popup.component.scss'],
})
export class AddDateToProjectProfilePopupComponent implements OnInit {
  public projectControl: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDateToProjectProfilePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: DateInterface[] }
  ) {}

  ngOnInit() {
    this.initForm();
    this.projectControlOnChangeSubscriber();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onEnter(): void {
    const projectControlValue = this.projectControl.value;
    const { month, year } = projectControlValue;
    this.dialogRef.close({ projectMonth: month, projectYear: year });
  }

  private initForm(): void {
    this.projectControl = this.fb.group({
      month: [null, [Validators.required, Validators.max(12), Validators.min(1)]],
      year: [null, [Validators.required, Validators.min(2015)]],
    });
  }

  private projectControlOnChangeSubscriber(): void {
    this.projectControl.valueChanges.subscribe(({ month, year }) => {
      const existingDate = this.data.value.find(({ projectMonth, projectYear }) => {
        return month - 1 === projectMonth && +year === projectYear;
      });
      if (existingDate) {
        this.projectControl.setErrors({ existringDate: true });
      }
    });
  }
}
