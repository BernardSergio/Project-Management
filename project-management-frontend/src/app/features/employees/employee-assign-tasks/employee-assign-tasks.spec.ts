import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssignTasks } from './employee-assign-tasks';

describe('EmployeeAssignTasks', () => {
  let component: EmployeeAssignTasks;
  let fixture: ComponentFixture<EmployeeAssignTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAssignTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAssignTasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
