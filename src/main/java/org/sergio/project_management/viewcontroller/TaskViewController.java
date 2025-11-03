package org.sergio.project_management.viewcontroller;

import org.sergio.project_management.enums.Priority;
import org.sergio.project_management.enums.Status;
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
@RequestMapping("/tasks")
public class TaskViewController {
    @Autowired
    private ITaskService service;
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IProjectService projectService;
    //------------------------------------------------------------------------------------//
    @GetMapping
    public String showTasks(Model model) {
        var tasks = service.getAll(false);
        model.addAttribute("tasks", tasks);
        return "tasks/list";
    }
    //------------------------------------------------------------------------------------//
    @GetMapping("/{id}")
    public String showTaskDetails(@PathVariable Integer id, Model model) {
        var task = service.get(id, true);
        System.out.println(task);
        model.addAttribute("task", task);

        return "tasks/details";
    }
    //------------------------------------------------------------------------------------//
    @GetMapping("/create")
    public String showCreateForm(Model model) {
        var allProjects = projectService.getAll(false, false);
        var allPriorities  = Priority.values();

        model.addAttribute("newTask", new Task());
        model.addAttribute("allProjects", allProjects);
        model.addAttribute("allPriorities", allPriorities);
        return "tasks/create";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/create")
    public String createTask(@ModelAttribute Task task) {
        service.create(task);
        return "redirect:/tasks";
    }
    //======================================================================================================//
    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Integer id, Model model) {
        var task = service.get(id, false);
        var allStatuses  = Status.values();
        var allPriorities  = Priority.values();

        model.addAttribute("task", task);
        model.addAttribute("allStatuses", allStatuses);
        model.addAttribute("allPriorities", allPriorities);
        return "tasks/edit";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/{id}/edit")
    public String updateTask(@PathVariable Integer id, @ModelAttribute Task updated) {
        service.update(id, updated);
        return "redirect:/tasks";
    }
    //======================================================================================================//
    @GetMapping("/{id}/delete")
    public String deleteProject(@PathVariable Integer id) {
        service.delete(id);
        return "redirect:/tasks";
    }
    //======================================================================================================//
    @GetMapping("/{id}/assignEmployee")
    public String showAssignForm(@PathVariable Integer id, Model model) {
        var task = service.get(id, true);
        var availableEmployees = employeeService.getEmployeesForTask(id);

        model.addAttribute("task", task);
        model.addAttribute("availableEmployees", availableEmployees);

        return "tasks/assignEmployees";
    }
    //------------------------------------------------------------------------------------//
    @PostMapping("/{id}/assignEmployee")
    public String assignEmployees(@PathVariable Integer id, @RequestParam(required = false, name = "employeeIds") List<Integer> employeeIds) {

        service.assignEmployees(id, employeeIds != null ? employeeIds : new ArrayList<>());
        return "redirect:/tasks/" + id;
    }

}
