import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/Project.model';
import { ActionMenuComponent, ActionMenuItem } from '../../../shared/components/action-menu/action-menu.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-Project-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ActionMenuComponent,
    ConfirmDialogComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="top-bar">
      <h1>Project</h1>
      <button routerLink="/Project/create">
        <i class="fa-solid fa-plus fa-lg"></i> Add New Project
      </button>
    </div>

    <app-loading-spinner [isLoading]="loading" message="Loading Project..."></app-loading-spinner>

    @if (!loading && Project.length > 0) {
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (emp of Project; track emp.id) {
            <tr>
              <td>{{ emp.id }}</td>
              <td>{{ emp.firstName }} {{ emp.lastName }}</td>
              <td>{{ emp.title }}</td>
              <td>
                <app-action-menu [items]="getActionItems(emp)"></app-action-menu>
              </td>
            </tr>
          }
        </tbody>
      </table>
    }

    @if (!loading && projects.length === 0) {
      <p>No projects found.</p>
    }

    <app-confirm-dialog
      [isOpen]="showDeleteConfirm"
      [title]="'Delete Project'"
      [message]="'Are you sure you want to delete this Project?'"
      (confirmed)="confirmDelete()"
      (cancelled)="cancelDelete()">
    </app-confirm-dialog>
  `,
  styles: []
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  loading = false;
  showDeleteConfirm = false;
  projectToDelete: number | null = null;

  constructor(private ProjectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.ProjectService.getAll(false, false).subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.loading = false;
      }
    });
  }

  getActionItems(project: Project): ActionMenuItem[] {
    return [
      {
        label: 'View Details',
        icon: 'fa-solid fa-eye',
        route: `/projects/${project.id}`
      },
      {
        label: 'Edit',
        icon: 'fa-solid fa-pen',
        route: `/projects/${project.id}/edit`
      },
      {
        label: 'Assign Task',
        icon: 'fa-solid fa-plus',
        route: `/projects/${project.id}/assign-tasks`
      },
      {
        label: 'Assign to Project',
        icon: 'fa-solid fa-user-plus',
        route: `/projects/${project.id}/assign-projects`
      },
      { divider: true, label: '', icon: '' },
      {
        label: 'Delete',
        icon: 'fa-solid fa-trash',
        danger: true,
        action: () => this.deleteProject(project.id!)
      }
    ];
  }

  deleteProject(id: number) {
    this.projectToDelete = id;
    this.showDeleteConfirm = true;
  }

  confirmDelete() {
    if (this.projectToDelete) {
      this.ProjectService.delete(this.projectToDelete).subscribe({
        next: () => {
          this.loadProjects();
          this.projectToDelete = null;
        },
        error: (error) => {
          console.error('Error deleting Project:', error);
          alert('Error deleting Project');
        }
      });
    }
  }

  cancelDelete() {
    this.Project = null;
  }
}
