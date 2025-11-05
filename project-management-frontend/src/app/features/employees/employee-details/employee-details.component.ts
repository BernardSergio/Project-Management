import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { ActionMenuComponent, ActionMenuItem } from '../../../shared/components/action-menu/action-menu.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusLabels } from '../../../core/models/enums';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ActionMenuComponent, LoadingSpinnerComponent],
  template: `
    <div class="top-bar">
      <h1>Employee Details</h1>
    </div>

    <app-loading-spinner [isLoading]="loading"></app-loading-spinner>

    @if (!loading && employee) {
      <section class="info">
        <div>
          <h2>{{ employee.firstName }} {{ employee.lastName }}</h2>
          <div class="button-group">
            <button [routerLink]="['/employees', employee.id, 'edit']">
              <i class="fa-solid fa-pen"></i> Edit Employee
            </button>
            <button routerLink="/employees">
              <i class="fa-solid fa-arrow-left"></i> Back to List
            </button>
          </div>
        </div>
        <p>{{ employee.title }}</p>
        <p>Employee ID: <span>{{ employee.id }}</span></p>
      </section>

      <hr>

      <section class="lists">
        <div class="top-bar">
          <h3>Assigned Tasks</h3>
          <button [routerLink]="['/employees', employee.id, 'assign-tasks']">
            <i class="fa-solid fa-user-plus"></i> Assign Task
          </button>
        </div>

        @if (employee.assignedTasks && employee.assignedTasks.length > 0) {
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Due</th>
                <th>Project</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (task of employee.assignedTasks; track task.id) {
                <tr>
                  <td>{{ task.id }}</td>
                  <td>{{ task.name }}</td>
                  <td>{{ task.description }}</td>
                  <td>{{ task.priority }}</td>
                  <td>{{ task.dueDate }}</td>
                  <td>{{ task.project?.name || '-' }}</td>
                  <td>{{ getStatusLabel(task.status!) }}</td>
                  <td>
                    <app-action-menu [items]="getTaskActionItems(task.id!)"></app-action-menu>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <p>No assigned tasks.</p>
        }
      </section>

      <hr>

      <section class="lists">
        <div class="top-bar">
          <h3>Assigned Projects</h3>
          <button [routerLink]="['/employees', employee.id, 'assign-projects']">
            <i class="fa-solid fa-user-plus"></i> Assign to Project
          </button>
        </div>

        @if (employee.assignedProjects && employee.assignedProjects.length > 0) {
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Started</th>
                <th>Due</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (proj of employee.assignedProjects; track proj.id) {
                <tr>
                  <td>{{ proj.id }}</td>
                  <td>{{ proj.name }}</td>
                  <td>{{ proj.startDate || '-' }}</td>
                  <td>{{ proj.dueDate }}</td>
                  <td>{{ getStatusLabel(proj.status!) }}</td>
                  <td>
                    <app-action-menu [items]="getProjectActionItems(proj.id!)"></app-action-menu>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <p>No projects found.</p>
        }
      </section>
    }
  `,
  styles: []
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployee(id);
  }

  loadEmployee(id: number) {
    this.loading = true;
    this.employeeService.getById(id, true, true).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employee:', error);
        this.loading = false;
      }
    });
  }

  getStatusLabel(status: string): string {
    return StatusLabels[status as keyof typeof StatusLabels] || status;
  }

  getTaskActionItems(taskId: number): ActionMenuItem[] {
    return [
      {
        label: 'View Details',
        icon: 'fa-solid fa-eye',
        route: `/tasks/${taskId}`
      }
    ];
  }

  getProjectActionItems(projectId: number): ActionMenuItem[] {
    return [
      {
        label: 'View Details',
        icon: 'fa-solid fa-eye',
        route: `/projects/${projectId}`
      }
    ];
  }
}
