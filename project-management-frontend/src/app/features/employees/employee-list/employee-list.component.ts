import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { ActionMenuComponent, ActionMenuItem } from '../../../shared/components/action-menu/action-menu.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-employee-list',
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
      <h1>Employees</h1>
      <button routerLink="/employees/create">
        <i class="fa-solid fa-plus fa-lg"></i> Add New Employee
      </button>
    </div>

    <app-loading-spinner [isLoading]="loading" message="Loading employees..."></app-loading-spinner>

    @if (!loading && employees.length > 0) {
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
          @for (emp of employees; track emp.id) {
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

    @if (!loading && employees.length === 0) {
      <p>No employees found.</p>
    }

    <app-confirm-dialog
      [isOpen]="showDeleteConfirm"
      [title]="'Delete Employee'"
      [message]="'Are you sure you want to delete this employee?'"
      (confirmed)="confirmDelete()"
      (cancelled)="cancelDelete()">
    </app-confirm-dialog>
  `,
  styles: []
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;
  showDeleteConfirm = false;
  employeeToDelete: number | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.employeeService.getAll(false, false).subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.loading = false;
      }
    });
  }

  getActionItems(employee: Employee): ActionMenuItem[] {
    return [
      {
        label: 'View Details',
        icon: 'fa-solid fa-eye',
        route: `/employees/${employee.id}`
      },
      {
        label: 'Edit',
        icon: 'fa-solid fa-pen',
        route: `/employees/${employee.id}/edit`
      },
      {
        label: 'Assign Task',
        icon: 'fa-solid fa-plus',
        route: `/employees/${employee.id}/assign-tasks`
      },
      {
        label: 'Assign to Project',
        icon: 'fa-solid fa-user-plus',
        route: `/employees/${employee.id}/assign-projects`
      },
      { divider: true, label: '', icon: '' },
      {
        label: 'Delete',
        icon: 'fa-solid fa-trash',
        danger: true,
        action: () => this.deleteEmployee(employee.id!)
      }
    ];
  }

  deleteEmployee(id: number) {
    this.employeeToDelete = id;
    this.showDeleteConfirm = true;
  }

  confirmDelete() {
    if (this.employeeToDelete) {
      this.employeeService.delete(this.employeeToDelete).subscribe({
        next: () => {
          this.loadEmployees();
          this.employeeToDelete = null;
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          alert('Error deleting employee');
        }
      });
    }
  }

  cancelDelete() {
    this.employeeToDelete = null;
  }
}
