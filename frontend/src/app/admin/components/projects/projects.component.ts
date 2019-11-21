import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { ProjectsApiService } from '../../../core/services/projects-api.service';
import { ProjectModel } from '../../../shared/models/projects.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { AddPopupComponent } from '../popups/add-popup/add-popup.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects$: BehaviorSubject<ProjectModel[]> = new BehaviorSubject([]);
  public displayedColumns: string[] = ['title'];

  constructor(private snackbar: SnackbarService, private projectsApi: ProjectsApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.projectsApi.getProjects().subscribe(res => this.projects$.next(res));
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '400px',
      data: { title: 'Введите название проекта' }
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        filter(res => !!res),
        switchMap(res => this.projectsApi.addProject({ title: res }))
      )
      .subscribe(res => {
        this.snackbar.showSuccessSnackBar('Проект успешно добавлен');
        this.projects$.next([...this.projects$.value, res]);
      });
  }
}
