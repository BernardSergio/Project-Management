import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { Task } from '../../../core/models/task.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusLabels } from '../../../core/models/enums';

@Component({
  selector: 'app-employee-assign-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  template: `
    <div class="top-bar">
      <h1>Assign {{ employee?.firstName }} {{ employee?.lastName }} to Tasks</h1>
    </div>

    <app-loading-spinner [isLoading]="loading"></app-loading-spinner>

    @if (!loading && employee && availableTasks.length > 0) {
      <form class="assign-form" (ngSubmit)="onSubmit()">
        <div>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Due</th>
                <th>Project</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              @for (task of availableTasks; track task.id) {
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      [value]="task.id"
                      [checked]="isTaskAssigned(task.id!)"
                      (change)="toggleTask(task.id!, $event)"
                    />
                  </td>
                  <td>{{ task.id }}</td>
                  <td>{{ task.name }}</td>
                  <td>{{ task.description }}</td>
                  <td>{{ task.priority }}</td>
                  <td>{{ task.dueDate }}</td>
                  <td>{{ task.project?.name || '-' }}</td>
                  <td>{{ getStatusLabel(task.status!) }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="form-actions">
          <button type="submit" class="submit" [disabled]="submitting">
            <i class="fa-solid fa-save"></i> Update Assigned Tasks
          </button>
          <button type="button" class="cancel" (click)="onCancel()">
            Cancel
          </button>
        </div>
      </form>
    }

    @if (!loading && availableTasks.length === 0) {
      <p>No available tasks for this employee.</p>
    }
  `,
  styles: []
})
export class EmployeeAssignTasksComponent implements OnInit {
  employee: Employee | null = null;
  availableTasks: Task[] = [];
  selectedTaskIds: Set<number> = new Set();
  loading = false;
  submitting = false;
  employeeId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData() {
    this.loading = true;
    // NOTE: You'll need to add a getTasksForEmployee method to EmployeeService
    // For now, we'll simulate it by getting the employee with tasks
    this.employeeService.getById(this.employeeId, true, false).subscribe({
      next: (data) => {
        this.employee = data;
        // Initialize selected tasks from employee's assigned tasks
        if (this.employee.assignedTasks) {
          this.employee.assignedTasks.forEach(task => {
            if (task.id) this.selectedTaskIds.add(task.id);
          });
        }
        // For availableTasks, you should call your backend's getTasksForEmployee
        // This is a simplified version
        this.availableTasks = data.assignedTasks || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    });
  }

  isTaskAssigned(taskId: number): boolean {
    return this.selectedTaskIds.has(taskId);
  }

  toggleTask(taskId: number, event: any) {
    if (event.target.checked) {
      this.selectedTaskIds.add(taskId);
    } else {
      this.selectedTaskIds.delete(taskId);
    }
  }

  getStatusLabel(status: string): string {
    return StatusLabels[status as keyof typeof StatusLabels] || status;
  }

  onSubmit() {
    this.submitting = true;
    const taskIds = Array.from(this.selectedTaskIds);

    // NOTE: Add assignTasks method to EmployeeService
    // For now, this will cause an error - you need to implement it
    console.log('Assigning tasks:', taskIds);

    // Placeholder - implement actual service call
    setTimeout(() => {
      this.submitting = false;
      this.router.navigate(['/employees', this.employeeId]);
    }, 1000);
  }

  onCancel() {
    this.router.navigate(['/employees', this.employeeId]);
  }
}
