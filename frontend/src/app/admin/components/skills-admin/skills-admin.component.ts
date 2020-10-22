import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { InputFile } from 'ngx-input-file';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { SkillsApiService } from 'src/app/core/services/skills-api.service';
import { SkillsModel } from 'src/app/shared/models/skills.model';
import { environment } from 'src/environments/environment';

import { DictionaryApiService } from '../../../core/services/dictionary-api.service';
import { DictionaryModel } from '../../../shared/models/dictionary.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { AddPopupComponent } from '../popups/add-popup/add-popup.component';
import { AddSkillPopupComponent } from '../popups/add-skill-popup/add-skill-popup.component';

@Component({
  selector: 'app-skills-admin',
  templateUrl: './skills-admin.component.html',
  styleUrls: ['./skills-admin.component.scss'],
})
export class SkillsAdminComponent implements OnInit {
  public skills$: Observable<SkillsModel[]>;

  public displayedColumns: string[] = ['icon', 'name', 'edit', 'delete'];

  public baseUrl = environment.baseUrl;

  constructor(private skillsApi: SkillsApiService, private snackbar: SnackbarService, public dialog: MatDialog) {}

  ngOnInit() {
    this.initSkills();
  }

  private initSkills() {
    this.skills$ = this.skillsApi.getAll();
  }

  public trackByFn(index: number, item: DictionaryModel) {
    return `${item._id}_${item.name}`;
  }

  public delete(skill: SkillsModel) {
    this.skillsApi
      .deleteSkill(skill._id)
      .pipe(
        first(),
        tap(() => (this.skills$ = this.skillsApi.getAll()))
      )
      .subscribe(() => {
        this.snackbar.showSuccessSnackBar('Позиция успешно удалена');
      });
  }

  public openDialog(value?: DictionaryModel): void {
    const dialogRef = this.dialog.open(AddSkillPopupComponent, {
      width: '400px',
      data: { value },
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter((res) => !!res),
        switchMap((res: SkillsModel) => {
          if (res._id) {
            return this.skillsApi.updateSkill(res);
          }
          return this.skillsApi.createSkill(res);
        }),
        tap(() => {
          this.skills$ = this.skillsApi.getAll();
        })
      )
      .subscribe(() => {
        this.snackbar.showSuccessSnackBar('Операция выполнена успешно');
      });
  }
}
