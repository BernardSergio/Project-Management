package org.sergio.project_management.service;

import org.sergio.project_management.model.Employee;

import java.util.List;

public interface IEmployeeService {
    List<Employee> getAll(boolean includeTasks, boolean includeProjects);
    Employee get(Integer id, boolean includeTasks, boolean includeProjects);
    Employee create(Employee employee);
    Employee update(Integer id, Employee employee);
    void delete(Integer id);

    void assignProjects(Integer employeeId, List<Integer> projectIds);
    void assignTasks(Integer employeeId, List<Integer> taskIds);

    List<Employee> getEmployeesForTask(Integer taskId);
}
