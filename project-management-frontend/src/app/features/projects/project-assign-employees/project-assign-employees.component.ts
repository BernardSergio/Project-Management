import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { Project } from '../../../core/models/project.model';
import { Employee } from '../../../core/models/employee.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-project-assign-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  template: `
    <div class="top-bar">
      <h1>Assign Employees to {{ project?.name }}</h1>
    </div>

    <app-loading-spinner [isLoading]="loading"></app-loading-spinner>

    @if (!loading && project && allEmployees.length > 0) {
      <form class="assign-form" (ngSubmit)="onSubmit()">
        <div>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              @for (emp of allEmployees; track emp.id) {
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      [value]="emp.id"
                      [checked]="isEmployeeAssigned(emp.id!)"
                      (change)="toggleEmployee(emp.id!, $event)"
                    />
                  </td>
                  <td>{{ emp.id }}</td>
                  <td>{{ emp.firstName }} {{ emp.lastName }}</td>
                  <td>{{ emp.title }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="form-actions">
          <button type="submit" class="submit" [disabled]="submitting">
            <i class="fa-solid fa-save"></i> Update Assigned Employees
          </button>
          <button type="button" class="cancel" (click)="onCancel()">
            Cancel
          </button>
        </div>
      </form>
    }

    @if (!loading && allEmployees.length === 0) {
      <p>No employees available.</p>
    }
  `,
  styles: []
})
export class ProjectAssignEmployeesComponent implements OnInit {
  project: Project | null = null;
  allEmployees: Employee[] = [];
  selectedEmployeeIds: Set<number> = new Set();
  loading = false;
  submitting = false;
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData() {
    this.loading = true;
    forkJoin({
      project: this.projectService.getById(this.projectId, false, true),
      employees: this.employeeService.getAll(false, false)
    }).subscribe({
      next: (data) => {
        this.project = data.project;
        this.allEmployees = data.employees;

        // Initialize selected employees
        if (this.project.assignedEmployees) {
          this.project.assignedEmployees.forEach(emp => {
            if (emp.id) this.selectedEmployeeIds.add(emp.id);
          });
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    });
  }

  isEmployeeAssigned(employeeId: number): boolean {
    return this.selectedEmployeeIds.has(employeeId);
  }

  toggleEmployee(employeeId: number, event: any) {
    if (event.target.checked) {
      this.selectedEmployeeIds.add(employeeId);
    } else {
      this.selectedEmployeeIds.delete(employeeId);
    }
  }

  onSubmit() {
    this.submitting = true;
    const employeeIds = Array.from(this.selectedEmployeeIds);

    this.projectService.assignEmployees(this.projectId, employeeIds).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/projects', this.projectId]);
      },
      error: (error) => {
        console.error('Error assigning employees:', error);
        this.submitting = false;
        alert('Error assigning employees');
      }
    });
  }

  onCancel() {
    this.router.navigate(['/projects', this.projectId]);
  }
}
