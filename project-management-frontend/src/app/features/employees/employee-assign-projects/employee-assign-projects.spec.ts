import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssignProjects } from './employee-assign-projects';

describe('EmployeeAssignProjects', () => {
  let component: EmployeeAssignProjects;
  let fixture: ComponentFixture<EmployeeAssignProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAssignProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAssignProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
