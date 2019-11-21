import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
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
  public projects$: Observable<ProjectModel[]>;
  public displayedColumns: string[] = ['title'];

  constructor(private snackbar: SnackbarService, private projectsApi: ProjectsApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.projects$ = this.projectsApi.getProjects();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '400px',
      data: { title: 'Введите название проекта' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.projectsApi.addProject({ title: result }).subscribe(() => {
        this.snackbar.showSuccessSnackBar('Проект успешно добавлен');
        this.projects$ = this.projectsApi.getProjects();
      });
    });
  }
}
