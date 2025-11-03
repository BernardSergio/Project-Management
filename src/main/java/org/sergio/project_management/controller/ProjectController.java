package org.sergio.project_management.controller;

import org.sergio.project_management.model.Project;
import org.sergio.project_management.serviceimpl.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/project")
@RestController
public class ProjectController {
    @Autowired
    private ProjectService service;
    //========================================================================================================//
    @GetMapping
    public List<Project> getAllProjects(@RequestParam(name = "includeTasks", defaultValue = "false") boolean includeTasks,
                                        @RequestParam(name = "includeEmployees", defaultValue = "false") boolean includeEmployees) {
        return service.getAll(includeTasks, includeEmployees);
    }
    //========================================================================================================//
    @GetMapping("/{id}")
    public Project getProject(@PathVariable("id") Integer id,
                              @RequestParam(name = "includeTasks", defaultValue = "false") boolean includeTasks,
                              @RequestParam(name = "includeEmployees", defaultValue = "false") boolean includeEmployees) {
        return service.get(id, includeTasks, includeEmployees);
    }
    //========================================================================================================//
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Project createProject(@RequestBody Project project) {
        return service.create(project);
    }
    //========================================================================================================//
    @PostMapping("/{id}/assign")
    @ResponseStatus(HttpStatus.CREATED)
    public void assignEmployees(@PathVariable("id") Integer id, @RequestParam(required = false, name = "employeeIds") List<Integer> employeeIds) {
        service.assignEmployees(id, employeeIds);
    }
    //========================================================================================================//
    @PutMapping("/{id}")
    public Project updateProject(@PathVariable("id") Integer id, @RequestBody Project project) {
        return service.update(id, project);
    }
    //========================================================================================================//
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable("id") Integer id) {
        service.delete(id);
    }
    //========================================================================================================//
}
