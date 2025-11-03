package org.sergio.project_management.serviceimpl;

import jakarta.transaction.Transactional;
import org.sergio.project_management.entity.EmployeeData;
import org.sergio.project_management.entity.ProjectData;
import org.sergio.project_management.entity.TaskData;
import org.sergio.project_management.enums.Status;
import org.sergio.project_management.model.Task;
import org.sergio.project_management.repository.EmployeeRepository;
import org.sergio.project_management.repository.TaskRepository;
import org.sergio.project_management.service.ITaskService;
import org.sergio.project_management.transform.TransformEmployee;
import org.sergio.project_management.transform.TransformTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService implements ITaskService {
    @Autowired
    private TaskRepository repository;
    @Autowired
    private EmployeeRepository employeeRepository;
    //========================================================================================================//
    @Override
    public List<Task> getAll(boolean includeEmployees) {
        List<TaskData> taskDataList = new ArrayList<>();
        repository.findAll().forEach(taskDataList::add);

        List<Task> tasks = new ArrayList<>();
        for (TaskData data : taskDataList) {
            Task task = TransformTask.toModel(data);

            if(includeEmployees){
                task.setAssignedEmployees(data.getAssignedEmployees().stream().map(TransformEmployee::toModel).toList());
            }

            tasks.add(task);
        }
        return tasks;
    }
    //========================================================================================================//
    @Override
    public Task get(Integer id, boolean includeEmployees) {
        TaskData data = repository.findById(id).orElseThrow(() -> new RuntimeException("Task not found."));
        if (data == null) return null;

        Task task = TransformTask.toModel(data);
        if(includeEmployees){
            task.setAssignedEmployees(data.getAssignedEmployees().stream().map(TransformEmployee::toModel).toList());
        }

        return task;
    }
    //========================================================================================================//
    @Override
    public Task create(Task task) {
        TaskData taskData = TransformTask.toData(task);
        taskData.setStatus(Status.IN_PROGRESS);
        TaskData saved = repository.save(taskData);

        return TransformTask.toModel(saved);
    }
    //========================================================================================================//
    @Override
    public Task update(Integer id, Task task) {
        TaskData existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Task not found."));

        ProjectData project = existing.getProject();

        existing.setName(task.getName());
        existing.setDescription(task.getDescription());
        existing.setPriority(task.getPriority());
        existing.setDueDate(task.getDueDate());
        existing.setProject(project);
        existing.setStatus(task.getStatus());

        repository.save(existing);

        return TransformTask.toModel(existing);
    }
    //========================================================================================================//
    @Override
    @Transactional
    public void delete(Integer id) {
        TaskData task = repository.findById(id).orElseThrow(() -> new RuntimeException("Task not found."));

        if (task.getAssignedEmployees() != null) {
            for (EmployeeData emp : task.getAssignedEmployees()) {
                emp.getAssignedTasks().remove(task);
            }
//            task.getAssignedEmployees().clear();
        }

        if (task.getProject() != null) {
//            task.getProject().getTasks().remove(task);
            task.setProject(null);
        }

        repository.save(task);
        repository.delete(task);

    }
    //========================================================================================================//
    @Override
    @Transactional
    public void assignEmployees(Integer taskId, List<Integer> employeeIds) {
        TaskData task = repository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found."));

        List<EmployeeData> current = new ArrayList<>(task.getAssignedEmployees());

        List<EmployeeData> updated = new ArrayList<>();
        employeeRepository.findAllById(employeeIds).forEach(updated::add);

        for (EmployeeData emp : current) {
            if (!updated.contains(emp)) {
                emp.getAssignedTasks().remove(task);
            }
        }

        for (EmployeeData emp : updated) {
            if (!emp.getAssignedTasks().contains(task)) {
                emp.getAssignedTasks().add(task);
            }
        }

        task.setAssignedEmployees(updated);

        employeeRepository.saveAll(updated);
    }
    //========================================================================================================//
    @Override
    public List<Task> getTasksForEmployee(Integer employeeId) {
        EmployeeData employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found."));

        List<ProjectData> assignedProjects = employee.getAssignedProjects();

        if (assignedProjects == null || assignedProjects.isEmpty()) {
            return new ArrayList<>();
        }

        List<Integer> projectIds = new ArrayList<>();
        for (ProjectData project : assignedProjects) {
            projectIds.add(project.getId());
        }

        List<TaskData> taskDataList = repository.findByProjectIdIn(projectIds);

        List<Task> tasks = new ArrayList<>();
        for (TaskData data : taskDataList) {
            tasks.add(TransformTask.toModel(data));
        }

        return tasks;
    }
}
