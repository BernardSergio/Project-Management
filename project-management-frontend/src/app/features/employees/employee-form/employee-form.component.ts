import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  template: `
    <div class="top-bar">
      <h1>{{ isEditMode ? 'Edit Employee' : 'Add New Employee' }}</h1>
    </div>

    <app-loading-spinner [isLoading]="loading"></app-loading-spinner>

    @if (!loading) {
      <div>
        <form class="employee-form" [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
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
            <button type="submit" class="submit" [disabled]="employeeForm.invalid || submitting">
              <i class="fa-solid fa-save"></i>
              {{ isEditMode ? 'Update Employee' : 'Add Employee' }}
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
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = Number(id);
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number) {
    this.loading = true;
    this.employeeService.getById(id, false, false).subscribe({
      next: (data) => {
        this.employeeForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          title: data.title
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employee:', error);
        this.loading = false;
        alert('Error loading employee');
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.submitting = true;
      const employeeData = this.employeeForm.value;

      const request = this.isEditMode
        ? this.employeeService.update(this.employeeId!, employeeData)
        : this.employeeService.create(employeeData);

      request.subscribe({
        next: (response) => {
          this.submitting = false;
          if (this.isEditMode) {
            this.router.navigate(['/employees', this.employeeId]);
          } else {
            this.router.navigate(['/employees']);
          }
        },
        error: (error) => {
          console.error('Error saving employee:', error);
          this.submitting = false;
          alert('Error saving employee');
        }
      });
    }
  }

  onCancel() {
    if (this.isEditMode && this.employeeId) {
      this.router.navigate(['/employees', this.employeeId]);
    } else {
      this.router.navigate(['/employees']);
    }
  }
}
