import { Priority, Status } from './enums';
import { Project } from './project.model';
import { Employee } from './employee.model';

export interface Task {
  id?: number;
  name: string;
  description: string;
  priority: Priority;
  dueDate: string;
  project?: Project;
  status?: Status;
  assignedEmployees?: Employee[];
  updatedAt?: string;
  createdAt?: string;
}

export interface TaskCreateDto {
  name: string;
  description: string;
  priority: Priority;
  dueDate: string;
  project: {
    id: number;
  };
}

export interface TaskUpdateDto {
  name: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: Status;
}
