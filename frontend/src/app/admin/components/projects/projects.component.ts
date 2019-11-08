import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ProjectsApiService } from '../../../core/services/projects-api.service';
import { ProjectModel } from '../../../shared/models/projects.model';
import { ProjectAddComponent } from './project-add/project-add.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects$: Observable<ProjectModel[]>;
  displayedColumns: string[];
  title: string;
  constructor(private projectsApi: ProjectsApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.projects$ = this.projectsApi.getProjects();
    this.setDisplayedColumns();
  }

  private setDisplayedColumns(): void {
    this.displayedColumns = ['title'];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectAddComponent, {
      width: '250px',
      data: { title: this.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.projectsApi
        .addProject({ title: result })
        .subscribe(res => (this.projects$ = this.projectsApi.getProjects()));
    });
  }
}
