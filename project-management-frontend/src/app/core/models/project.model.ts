import { Status } from './enums';
import { Task } from './task.model';
import { Employee } from './employee.model';

export interface Project {
  id?: number;
  name: string;
  startDate?: string;
  dueDate: string;
  status?: Status;
  tasks?: Task[];
  assignedEmployees?: Employee[];
  updatedAt?: string;
  createdAt?: string;
}

export interface ProjectCreateDto {
  name: string;
  dueDate: string;
}

export interface ProjectUpdateDto {
  name: string;
  startDate?: string;
  dueDate: string;
  status: Status;
}
