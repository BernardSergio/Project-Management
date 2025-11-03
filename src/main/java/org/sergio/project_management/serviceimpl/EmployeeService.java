package org.sergio.project_management.serviceimpl;

import jakarta.transaction.Transactional;
import org.sergio.project_management.entity.EmployeeData;
import org.sergio.project_management.entity.ProjectData;
import org.sergio.project_management.entity.TaskData;
import org.sergio.project_management.model.Employee;
import org.sergio.project_management.repository.EmployeeRepository;
import org.sergio.project_management.repository.ProjectRepository;
import org.sergio.project_management.repository.TaskRepository;
import org.sergio.project_management.service.IEmployeeService;
import org.sergio.project_management.transform.TransformEmployee;
import org.sergio.project_management.transform.TransformProject;
import org.sergio.project_management.transform.TransformTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService implements IEmployeeService {
    @Autowired
    private EmployeeRepository repository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TaskRepository taskRepository;
    //========================================================================================================//
    @Override
    public List<Employee> getAll(boolean includeTasks, boolean includeProjects) {
        List<EmployeeData> employeeDataList = new ArrayList<>();
        repository.findAll().forEach(employeeDataList::add);

        List<Employee> employees = new ArrayList<>();
        for (EmployeeData data : employeeDataList) {
            Employee employee = TransformEmployee.toModel(data);

            if(includeTasks){
                employee.setAssignedTasks(data.getAssignedTasks().stream().map(TransformTask::toModel).toList());
            }

            if(includeProjects){
                employee.setAssignedProjects(data.getAssignedProjects().stream().map(TransformProject::toModel).toList());
            }
            employees.add(employee);
        }
        return employees;
    }
    //========================================================================================================//
    @Override
    public Employee get(Integer id, boolean includeTasks, boolean includeProjects) {
        EmployeeData data = repository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found."));
        if (data == null) return null;

        Employee employee = TransformEmployee.toModel(data);
        if(includeTasks){
            employee.setAssignedTasks(data.getAssignedTasks().stream().map(TransformTask::toModel).toList());
        }

        if(includeProjects){
            employee.setAssignedProjects(data.getAssignedProjects().stream().map(TransformProject::toModel).toList());
        }

        return employee;
    }
    //========================================================================================================//
    @Override
    public Employee create(Employee employee) {
        EmployeeData employeeData = TransformEmployee.toData(employee);
        EmployeeData saved = repository.save(employeeData);
        saved.setId(saved.getId());

        return TransformEmployee.toModel(saved);
    }
    //========================================================================================================//
    @Override
    public Employee update(Integer id, Employee employee) {
        EmployeeData existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found."));

        existing.setFirstName(employee.getFirstName());
        existing.setLastName(employee.getLastName());
        existing.setTitle(employee.getTitle());

        repository.save(existing);

        return TransformEmployee.toModel(existing);
    }
    //========================================================================================================//
    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
    //========================================================================================================//
    @Override
    @Transactional
    public void assignProjects(Integer employeeId, List<Integer> projectIds) {
        EmployeeData employee = repository.findById(employeeId).orElseThrow(() -> new RuntimeException("Employee not found."));

        List<ProjectData> current = new ArrayList<>(employee.getAssignedProjects());

        List<ProjectData> updated = new ArrayList<>();
        projectRepository.findAllById(projectIds).forEach(updated::add);

        for (ProjectData proj : current) {
            if (!updated.contains(proj)) {
//                proj.getAssignedEmployees().remove(employee);

                for (TaskData task : proj.getTasks()) {
                    employee.getAssignedTasks().remove(task);
                }
            }
        }
//
//        for (ProjectData proj : updated) {
//            if (!employee.getAssignedProjects().contains(proj)) {
//                employee.getAssignedProjects().add(proj);
//            }
//        }

        employee.setAssignedProjects(updated);

        repository.save(employee);


//        List<ProjectData> projects = new ArrayList<>();
//        projectRepository.findAllById(projectIds).forEach(projects::add);
//
//        for (ProjectData proj : projects) {
//            if (!employee.getAssignedProjects().contains(proj)) {
//                employee.getAssignedProjects().add(proj);
//            }
//        }
//
//        employee.setAssignedProjects(projects);
//
//        repository.save(employee);
    }
    //========================================================================================================//
    @Override
    @Transactional
    public void assignTasks(Integer employeeId, List<Integer> taskIds) {
        EmployeeData employee = repository.findById(employeeId).orElseThrow(() -> new RuntimeException("Employee not found."));

        List<TaskData> tasks = new ArrayList<>();
        taskRepository.findAllById(taskIds).forEach(tasks::add);

        for (TaskData task : tasks) {
            if (!employee.getAssignedTasks().contains(task)) {
                employee.getAssignedTasks().add(task);
            }
        }

        employee.setAssignedTasks(tasks);

        repository.save(employee);
    }
    //========================================================================================================//
    @Override
    public List<Employee> getEmployeesForTask(Integer taskId) {
        TaskData task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found."));

        ProjectData project = task.getProject();
        List<EmployeeData> employeeDatalist = project.getAssignedEmployees();

        List<Employee> employees = new ArrayList<>();
        for (EmployeeData data : employeeDatalist) {
            employees.add(TransformEmployee.toModel(data));
        }

        return employees;
    }
}
