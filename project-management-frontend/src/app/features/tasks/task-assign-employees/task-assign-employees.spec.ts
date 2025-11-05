import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssignEmployees } from './task-assign-employees';

describe('TaskAssignEmployees', () => {
  let component: TaskAssignEmployees;
  let fixture: ComponentFixture<TaskAssignEmployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAssignEmployees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAssignEmployees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
