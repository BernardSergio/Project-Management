package org.sergio.project_management.service;

import org.sergio.project_management.model.Project;

import java.util.List;

public interface IProjectService {
    List<Project> getAll(boolean includeTasks, boolean includeEmployees);
    Project get(Integer id, boolean includeTasks, boolean includeEmployees);
    Project create(Project project);
    Project update(Integer id, Project project);
    void delete(Integer id);

    void assignEmployees(Integer projectId, List<Integer> employeeIds);
    void addTasks(Integer projectId, List<Integer> taskIds);
}
