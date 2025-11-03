package org.sergio.project_management.viewcontroller;

import org.sergio.project_management.model.Employee;
import org.sergio.project_management.service.IEmployeeService;
import org.sergio.project_management.service.IProjectService;
import org.sergio.project_management.service.ITaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/employees")
public class EmployeeViewController {
    @Autowired
    private IEmployeeService service;
    @Autowired
    private IProjectService projectService;
    @Autowired
    private ITaskService taskService;
    //======================================================================================================//
    @GetMapping
    public String showEmployees(Model model) {
        var employees = service.getAll(false, false);
        model.addAttribute("employees", employees);
        return "employees/list";
    }
    //======================================================================================================//
    @GetMapping("/{id}")
    public String showEmployeeDetails(@PathVariable Integer id, Model model) {
        var employee = service.get(id, true, true);
        model.addAttribute("employee", employee);
        return "employees/details";
    }
    //======================================================================================================//
    @GetMapping("/create")
    public String showCreateForm(Model model) {
        model.addAttribute("newEmployee", new Employee());
        return "employees/create";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/create")
    public String createEmployee(@ModelAttribute Employee employee) {
        service.create(employee);
        return "redirect:/employees";
    }
    //======================================================================================================//
    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Integer id, Model model) {
        var employee = service.get(id, false, false);
        model.addAttribute("employee", employee);
        return "employees/edit";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/{id}/edit")
    public String updateEmployee(@PathVariable Integer id, @ModelAttribute Employee updated) {
        service.update(id, updated);
        return "redirect:/employees";
    }
    //======================================================================================================//
    @GetMapping("/{id}/delete")
    public String deleteEmployee(@PathVariable Integer id) {
        service.delete(id);
        return "redirect:/employees";
    }
    //======================================================================================================//
    @GetMapping("/{id}/assignTask")
    public String showAssignTaskForm(@PathVariable Integer id, Model model) {
        var employee = service.get(id, true, false);
        var availableTasks = taskService.getTasksForEmployee(id);

        model.addAttribute("employee", employee);
        model.addAttribute("availableTasks", availableTasks);

        return "employees/assignTasks";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/{id}/assignTask")
    public String assignTasks(@PathVariable Integer id, @RequestParam(required = false, name = "taskIds") List<Integer> taskIds) {
        var employee = service.get(id, false, true);
        service.assignTasks(id, taskIds != null ? taskIds : new ArrayList<>());
        return "redirect:/employees/" + id;
    }
    //======================================================================================================//
    @GetMapping("/{id}/assignProject")
    public String showAssignProjectForm(@PathVariable Integer id, Model model) {
        var employee = service.get(id, false, true);
        var allProjects = projectService.getAll(false, false);

        model.addAttribute("employee", employee);
        model.addAttribute("allProjects", allProjects);

        return "employees/assignProjects";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/{id}/assignProject")
    public String assignProjects(@PathVariable Integer id, @RequestParam(required = false, name = "projectIds") List<Integer> projectIds) {

        service.assignProjects(id, projectIds != null ? projectIds : new ArrayList<>());
        return "redirect:/employees/" + id;
    }
    //======================================================================================================//

}
