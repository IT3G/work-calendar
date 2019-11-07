import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectModel } from '../../models/projects.model';
import { ProjectsApiService } from '../../services/api/projects-api.service';
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
  constructor(private projectsApi: ProjectsApiService, public dialog: MatDialog, private router: Router) {}

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
