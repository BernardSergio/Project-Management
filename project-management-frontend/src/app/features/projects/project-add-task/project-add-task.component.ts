import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { TaskService } from '../../../core/services/task.service';
import { Project } from '../../../core/models/project.model';
import { Priority } from '../../../core/models/enums';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-project-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  template: `
    <div class="top-bar">
      <h1>Add a Task to {{ project?.name }}</h1>
    </div>

    <app-loading-spinner [isLoading]="loading"></app-loading-spinner>

    @if (!loading) {
      <div>
        <form class="task-form" [formGroup]="taskForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Task Name</label>
            <input
              type="text"
              id="name"
              formControlName="name"
              placeholder="Enter task name"
              [class.error]="isFieldInvalid('name')"
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <input
              type="text"
              id="description"
              formControlName="description"
              placeholder="Enter task description"
              [class.error]="isFieldInvalid('description')"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="priority">Priority</label>
              <select id="priority" formControlName="priority">
                @for (priority of priorities; track priority) {
                  <option [value]="priority">{{ priority }}</option>
                }
              </select>
            </div>

            <div class="form-group">
              <label for="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                formControlName="dueDate"
                [class.error]="isFieldInvalid('dueDate')"
              />
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit" [disabled]="taskForm.invalid || submitting">
              <i class="fa-solid fa-save"></i> Add Task
            </button>
            <button type="button" class="cancel" (click)="onCancel()">
              Cancel
            </button>
          </div>
        </form>
      </div>
    }
  `,
  styles: [`
    .error {
      border: 2px solid var(--danger) !important;
    }
  `]
})
export class ProjectAddTaskComponent implements OnInit {
  taskForm: FormGroup;
  project: Project | null = null;
  projectId!: number;
  loading = false;
  submitting = false;
  priorities = Object.values(Priority);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: [Priority.MEDIUM, Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProject();
  }

  loadProject() {
    this.loading = true;
    this.projectService.getById(this.projectId, false, false).subscribe({
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

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.submitting = true;

      const taskData = {
        ...this.taskForm.value,
        project: {
          id: this.projectId
        }
      };

      this.taskService.create(taskData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/projects', this.projectId]);
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.submitting = false;
          alert('Error creating task');
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/projects', this.projectId]);
  }
}
