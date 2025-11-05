import { Task } from './task.model';
import { Project } from './project.model';

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  title: string;
  assignedTasks?: Task[];
  assignedProjects?: Project[];
}

export interface EmployeeCreateDto {
  firstName: string;
  lastName: string;
  title: string;
}

export interface EmployeeUpdateDto {
  firstName: string;
  lastName: string;
  title: string;
}
