import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  template: `
    <div class="top-bar">
      <h1>{{ isEditMode ? 'Edit Project' : 'Add New Project' }}</h1>
    </div>

    <app-loading-spinner [isLoading]="loading"></app-loading-spinner>

    @if (!loading) {
      <div>
        <form class="project-form" [formGroup]="projectForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                formControlName="firstName"
                placeholder="Enter first name"
                [class.error]="isFieldInvalid('firstName')"
              />
              @if (isFieldInvalid('firstName')) {
                <span class="error-message">First name is required</span>
              }
            </div>

            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                formControlName="lastName"
                placeholder="Enter last name"
                [class.error]="isFieldInvalid('lastName')"
              />
              @if (isFieldInvalid('lastName')) {
                <span class="error-message">Last name is required</span>
              }
            </div>
          </div>

          <div class="form-group">
            <label for="title">Job Title</label>
            <input
              type="text"
              id="title"
              formControlName="title"
              placeholder="Enter job title"
              [class.error]="isFieldInvalid('title')"
            />
            @if (isFieldInvalid('title')) {
              <span class="error-message">Job title is required</span>
            }
          </div>

          <div class="form-actions">
            <button type="submit" class="submit" [disabled]="projectForm.invalid || submitting">
              <i class="fa-solid fa-save"></i>
              {{ isEditMode ? 'Update Project' : 'Add Project' }}
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

    .error-message {
      color: var(--danger);
      font-size: 0.875rem;
      margin-top: 4px;
      display: block;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode = false;
  projectId: number | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.projectId = Number(id);
      this.loadProject(this.projectId);
    }
  }

  loadProject(id: number) {
    this.loading = true;
    this.projectService.getById(id, false, false).subscribe({
      next: (data) => {
        this.projectForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          title: data.title
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.loading = false;
        alert('Error loading project');
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.projectForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.submitting = true;
      const projectData = this.projectForm.value;

      const request = this.isEditMode
        ? this.projectService.update(this.projectId!, projectData)
        : this.projectService.create(projectData);

      request.subscribe({
        next: (response) => {
          this.submitting = false;
          if (this.isEditMode) {
            this.router.navigate(['/projects', this.projectId]);
          } else {
            this.router.navigate(['/projects']);
          }
        },
        error: (error) => {
          console.error('Error saving project:', error);
          this.submitting = false;
          alert('Error saving project');
        }
      });
    }
  }

  onCancel() {
    if (this.isEditMode && this.projectId) {
      this.router.navigate(['/projects', this.projectId]);
    } else {
      this.router.navigate(['/projects']);
    }
  }
}
