package org.sergio.project_management.viewcontroller;

import org.sergio.project_management.enums.Priority;
import org.sergio.project_management.enums.Status;
import org.sergio.project_management.model.Project;
import org.sergio.project_management.model.Task;
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
@RequestMapping("/projects")
public class ProjectViewController {
    @Autowired
    private IProjectService service;
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private ITaskService taskService;
    //======================================================================================================//
    @GetMapping
    public String showProjects(Model model) {
        var projects = service.getAll(false, false);
        model.addAttribute("projects", projects);
        return "projects/list";
    }
    //======================================================================================================//
    @GetMapping("/{id}")
    public String showProjectDetails(@PathVariable Integer id, Model model) {
        var project = service.get(id, true, true);
        model.addAttribute("project", project);
        return "projects/details";
    }
    //======================================================================================================//
    @GetMapping("/create")
    public String showCreateForm(Model model) {
        model.addAttribute("newProject", new Project());
        return "projects/create";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/create")
    public String createProject(@ModelAttribute Project project) {
        service.create(project);
        return "redirect:/projects";
    }
    //======================================================================================================//
    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Integer id, Model model) {
        var project = service.get(id, false, false);
        var allStatuses  = Status.values();

        model.addAttribute("project", project);
        model.addAttribute("allStatuses", allStatuses);
        return "projects/edit";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/{id}/edit")
    public String updateEmployee(@PathVariable Integer id, @ModelAttribute Project updated) {
        service.update(id, updated);
        return "redirect:/projects";
    }
    //======================================================================================================//
    @GetMapping("/{id}/delete")
    public String deleteProject(@PathVariable Integer id) {
        service.delete(id);
        return "redirect:/projects";
    }
    //======================================================================================================//
    @GetMapping("/{id}/assignEmployee")
    public String showAssignForm(@PathVariable Integer id, Model model) {
        var project = service.get(id, false, true);
        var allEmployees = employeeService.getAll(false, false);

        model.addAttribute("project", project);
        model.addAttribute("allEmployees", allEmployees);

        return "projects/assignEmployees";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/{id}/assignEmployee")
    public String assignEmployees(@PathVariable Integer id, @RequestParam(required = false, name = "employeeIds") List<Integer> employeeIds) {

        service.assignEmployees(id, employeeIds != null ? employeeIds : new ArrayList<>());
        return "redirect:/projects/" + id;
    }
    //======================================================================================================//
    @GetMapping("/{id}/addTask")
    public String showAddForm(@PathVariable Integer id, Model model) {
        var project = service.get(id, false, false);
        var allPriorities  = Priority.values();

        model.addAttribute("project", project);
        model.addAttribute("allPriorities", allPriorities);
        model.addAttribute("newTask", new Task());

        return "projects/addTasks";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/{id}/addTask")
    public String addTask(@PathVariable Integer id, @ModelAttribute Task task) {
        Project project = service.get(id, false, false);
        task.setId(null);
        task.setProject(project);
        taskService.create(task);

        return "redirect:/projects";
    }
}
