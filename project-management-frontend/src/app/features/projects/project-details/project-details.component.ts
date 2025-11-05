import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { ActionMenuComponent, ActionMenuItem } from '../../../shared/components/action-menu/action-menu.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusLabels } from '../../../core/models/enums';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ActionMenuComponent, LoadingSpinnerComponent],
  template: `
    <div class="top-bar">
      <h1>Project Details</h1>
    </div>

    <app-loading-spinner [isLoading]="loading"></app-loading-spinner>

    @if (!loading && project) {
      <section class="info">
        <div>
          <h2>{{ project.name }}</h2>
          <div class="button-group">
            <button [routerLink]="['/projects', project.id, 'edit']">
              <i class="fa-solid fa-pen"></i> Edit Project
            </button>
            <button routerLink="/projects">
              <i class="fa-solid fa-arrow-left"></i> Back to List
            </button>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <p>Status: <span>{{ getStatusLabel(project.status!) }}</span></p>
            <p>Project ID: <span>{{ project.id }}</span></p>
          </div>
          <div>
            <p>Due Date: <span>{{ project.dueDate || '-' }}</span></p>
            <p>Start Date: <span>{{ project.startDate || '-' }}</span></p>
          </div>
        </div>
      </section>

      <hr />

      <section class="lists">
        <div class="top-bar">
          <h3>Tasks</h3>
          <button [routerLink]="['/projects', project.id, 'add-task']">
            <i class="fa-solid fa-plus"></i> Add Task
          </button>
        </div>

        @if (project.tasks && project.tasks.length > 0) {
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Due</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (task of project.tasks; track task.id) {
                <tr>
                  <td>{{ task.id }}</td>
                  <td>{{ task.name }}</td>
                  <td>{{ task.description }}</td>
                  <td>{{ task.priority }}</td>
                  <td>{{ task.dueDate }}</td>
                  <td>{{ getStatusLabel(task.status!) }}</td>
                  <td>
                    <app-action-menu [items]="getTaskActionItems(task.id!)"></app-action-menu>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <p>No tasks found.</p>
        }
      </section>

      <hr />

      <section class="lists">
        <div class="top-bar">
          <h3>Assigned Employees</h3>
          <button [routerLink]="['/projects', project.id, 'assign-employees']">
            <i class="fa-solid fa-user-plus"></i> Assign Employee
          </button>
        </div>

        @if (project.assignedEmployees && project.assignedEmployees.length > 0) {
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
              @for (emp of project.assignedEmployees; track emp.id) {
                <tr>
                  <td>{{ emp.id }}</td>
                  <td>{{ emp.firstName }} {{ emp.lastName }}</td>
                  <td>{{ emp.title }}</td>
                  <td>
                    <app-action-menu [items]="getEmployeeActionItems(emp.id!)"></app-action-menu>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <p>No employees assigned to this project.</p>
        }
      </section>
    }
  `,
  styles: []
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProject(id);
  }

  loadProject(id: number) {
    this.loading = true;
    this.projectService.getById(id, true, true).subscribe({
      next: (data) => {
        this.project = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.loading = false;
      }
    });
  }

  getStatusLabel(status: string): string {
    return StatusLabels[status as keyof typeof StatusLabels] || status;
  }

  getTaskActionItems(taskId: number): ActionMenuItem[] {
    return [
      { label: 'View Details', icon: 'fa-solid fa-eye', route: `/tasks/${taskId}` },
      { label: 'Edit', icon: 'fa-solid fa-pen', route: `/tasks/${taskId}/edit` },
      { label: 'Assign Employees', icon: 'fa-solid fa-user-plus', route: `/tasks/${taskId}/assign-employees` }
    ];
  }

  getEmployeeActionItems(employeeId: number): ActionMenuItem[] {
    return [
      { label: 'View Details', icon: 'fa-solid fa-eye', route: `/employees/${employeeId}` }
    ];
  }
}
