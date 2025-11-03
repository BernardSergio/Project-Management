package org.sergio.project_management.controller;

import org.sergio.project_management.model.Task;
import org.sergio.project_management.serviceimpl.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/task")
@RestController
public class TaskController {
    @Autowired
    private TaskService service;
    //========================================================================================================//
    @GetMapping
    public List<Task> getAllTasks(@RequestParam(name = "includeEmployees", defaultValue = "false") boolean includeEmployees) {
        return service.getAll(includeEmployees);
    }
    //========================================================================================================//
    @GetMapping("/{id}")
    public Task getTask(@PathVariable("id") Integer id, @RequestParam(name = "includeEmployees", defaultValue = "false") boolean includeEmployees) {
        return service.get(id, includeEmployees);
    }
    //========================================================================================================//
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task) {
        return service.create(task);
    }
    //========================================================================================================//
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable("id") Integer id, @RequestBody Task task) {
        return service.update(id, task);
    }
    //========================================================================================================//
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable("id") Integer id) {
        service.delete(id);
    }
    //========================================================================================================//
}
