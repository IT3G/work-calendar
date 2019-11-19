import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ProjectsApiService } from '../../../core/services/projects-api.service';
import { ProjectModel } from '../../../shared/models/projects.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ProjectAddComponent } from './project-add/project-add.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects$: Observable<ProjectModel[]>;
  public displayedColumns: string[];
  public title: string;

  constructor(private snackbar: SnackbarService, private projectsApi: ProjectsApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.projects$ = this.projectsApi.getProjects();
    this.setDisplayedColumns();
  }

  private setDisplayedColumns(): void {
    this.displayedColumns = ['title'];
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ProjectAddComponent, {
      width: '250px',
      data: { title: this.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.projectsApi.addProject({ title: result }).subscribe(() => {
        this.snackbar.showSuccessSnackBar('Проект успешно добавлен');
        this.projects$ = this.projectsApi.getProjects();
      });
    });
  }
}
