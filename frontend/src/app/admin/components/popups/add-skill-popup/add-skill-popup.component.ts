import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InputFile } from 'ngx-input-file';
import { SkillsApiService } from 'src/app/core/services/skills-api.service';
import { SkillsModel } from 'src/app/shared/models/skills.model';
import { environment } from 'src/environments/environment';

import { DictionaryModel } from '../../../../shared/models/dictionary.model';

@Component({
  selector: 'app-add-skill-popup',
  templateUrl: './add-skill-popup.component.html',
  styleUrls: ['./add-skill-popup.component.scss'],
})
export class AddSkillPopupComponent implements OnInit {
  public file: InputFile;

  public baseUrl = environment.baseUrl;

  public logoName: string;

  constructor(
    private skillsApi: SkillsApiService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddSkillPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: SkillsModel }
  ) {}

  public addSkillFormGroup: FormGroup;

  public ngOnInit() {
    this.initFormGroup();
    if (this.data.value) {
      this.setDefaultValues();
    }
  }

  /** Значения по умолчанию, если это редактирование */
  private setDefaultValues() {
    const existingData = this.data.value;
    this.addSkillFormGroup.controls['name'].setValue(existingData.name);
    this.addSkillFormGroup.controls['hint'].setValue(existingData.hint);
    this.addSkillFormGroup.controls['logoName'].setValue(existingData.logoName);
    this.logoName = existingData.logoName;
  }

  private initFormGroup(): void {
    this.addSkillFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      hint: ['', Validators.required],
      logoName: ['', Validators.required],
    });
  }

  public addLogo(file: InputFile) {
    if (!file) {
      return;
    }

    this.skillsApi.uploadLogo(file).subscribe(() => {
      this.file = file;
      this.logoName = file.file.name;
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onEnter(): void {
    this.dialogRef.close({
      ...this.addSkillFormGroup.value,
      logoName: this.logoName,
      _id: this.data.value?._id ?? null,
    });
  }

  public deleteLogo() {
    this.logoName = null;
    this.file = null;
    this.addSkillFormGroup.controls['logoName'].setValue(null);
  }
}
