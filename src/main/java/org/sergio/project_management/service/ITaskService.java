package org.sergio.project_management.service;

import org.sergio.project_management.model.Task;

import java.util.List;

public interface ITaskService {
    List<Task> getAll(boolean includeEmployees);
    Task get(Integer id, boolean includeEmployees);
    Task create(Task task);
    Task update(Integer id, Task task);
    void delete(Integer id);

    void assignEmployees(Integer projectId, List<Integer> employeeIds);
    List<Task> getTasksForEmployee(Integer employeeId);
}
