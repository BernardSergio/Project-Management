package org.sergio.project_management.serviceimpl;

import jakarta.transaction.Transactional;
import org.sergio.project_management.entity.EmployeeData;
import org.sergio.project_management.entity.ProjectData;
import org.sergio.project_management.entity.TaskData;
import org.sergio.project_management.enums.Status;
import org.sergio.project_management.model.Project;
import org.sergio.project_management.repository.EmployeeRepository;
import org.sergio.project_management.repository.ProjectRepository;
import org.sergio.project_management.repository.TaskRepository;
import org.sergio.project_management.service.IProjectService;
import org.sergio.project_management.transform.TransformEmployee;
import org.sergio.project_management.transform.TransformProject;
import org.sergio.project_management.transform.TransformTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService implements IProjectService {
    @Autowired
    private ProjectRepository repository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private TaskRepository taskRepository;
    //========================================================================================================//
    @Override
    public List<Project> getAll(boolean includeTasks, boolean includeEmployees) {
        List<ProjectData> projectDataList = new ArrayList<>();
        repository.findAll().forEach(projectDataList::add);

        List<Project> projects = new ArrayList<>();
        for (ProjectData data : projectDataList) {
            Project project = TransformProject.toModel(data);

            if(includeTasks){
                project.setTasks(data.getTasks().stream().map(TransformTask::toModel).toList());
            }

            if(includeEmployees){
                project.setAssignedEmployees(data.getAssignedEmployees().stream().map(TransformEmployee::toModel).toList());
            }
            projects.add(project);
        }
        return projects;
    }
    //========================================================================================================//
    @Override
    public Project get(Integer id, boolean includeTasks, boolean includeEmployees) {
        ProjectData data = repository.findById(id).orElseThrow(() -> new RuntimeException("Project not found."));
        if (data == null) return null;

        Project project = TransformProject.toModel(data);

        if(includeTasks){
            project.setTasks(data.getTasks().stream().map(TransformTask::toModel).toList());
        }

        if(includeEmployees){
            project.setAssignedEmployees(data.getAssignedEmployees().stream().map(TransformEmployee::toModel).toList());
        }

        return project;
    }
    //========================================================================================================//
    @Override
    public Project create(Project project) {
        ProjectData projectData = TransformProject.toData(project);
        projectData.setStartDate(LocalDate.now());
        projectData.setStatus(Status.IN_PROGRESS);
        ProjectData saved = repository.save(projectData);

        return TransformProject.toModel(saved);
    }
    //========================================================================================================//
    @Override
    public Project update(Integer id, Project project) {
        ProjectData existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Project not found."));

        existing.setName(project.getName());
        existing.setStartDate(project.getStartDate());
        existing.setDueDate(project.getDueDate());
        existing.setStatus(project.getStatus());

        repository.save(existing);

        return TransformProject.toModel(existing);
    }
    //========================================================================================================//
    @Override
    @Transactional
    public void delete(Integer id) {
        ProjectData project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (project.getTasks() != null) {
            for (TaskData task : project.getTasks()) {
                if (task.getAssignedEmployees() != null) {
                    for (EmployeeData emp : task.getAssignedEmployees()) {
                        emp.getAssignedTasks().remove(task);
                    }
//                    task.getAssignedEmployees().clear();
                }
            }
        }

        if (project.getAssignedEmployees() != null) {
            for (EmployeeData employee : project.getAssignedEmployees()) {
                employee.getAssignedProjects().remove(project);
            }
//            project.getAssignedEmployees().clear();
        }

        repository.save(project);
        repository.delete(project);
    }
    //========================================================================================================//
    @Override
    @Transactional
    public void assignEmployees(Integer projectId, List<Integer> employeeIds) {
        ProjectData project = repository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found."));

        List<EmployeeData> current = new ArrayList<>(project.getAssignedEmployees());

        List<EmployeeData> updated = new ArrayList<>();
        employeeRepository.findAllById(employeeIds).forEach(updated::add);


        for (EmployeeData emp : current) {
            if (!updated.contains(emp)) {
                emp.getAssignedProjects().remove(project);

                for (TaskData task : project.getTasks()) {
                    emp.getAssignedTasks().remove(task);
//                    task.getAssignedEmployees().remove(emp);
                }
            }
        }

        for (EmployeeData emp : updated) {
            if (!emp.getAssignedProjects().contains(project)) {
                emp.getAssignedProjects().add(project);
            }
        }

//        project.setAssignedEmployees(updated);

        employeeRepository.saveAll(updated);


    }
    //========================================================================================================//
    @Override
    public void addTasks(Integer projectId, List<Integer> taskIds) {
        ProjectData project = repository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found."));

        List<TaskData> tasks = new ArrayList<>();
        taskRepository.findAllById(taskIds).forEach(tasks::add);

        for (TaskData task : tasks) {
            task.setProject(project);
        }

        project.setTasks(tasks);

        taskRepository.saveAll(tasks);
    }
}
