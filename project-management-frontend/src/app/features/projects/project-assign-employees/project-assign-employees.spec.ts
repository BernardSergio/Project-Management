import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAssignEmployees } from './project-assign-employees';

describe('ProjectAssignEmployees', () => {
  let component: ProjectAssignEmployees;
  let fixture: ComponentFixture<ProjectAssignEmployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectAssignEmployees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectAssignEmployees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
