import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddTask } from './project-add-task';

describe('ProjectAddTask', () => {
  let component: ProjectAddTask;
  let fixture: ComponentFixture<ProjectAddTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectAddTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectAddTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
