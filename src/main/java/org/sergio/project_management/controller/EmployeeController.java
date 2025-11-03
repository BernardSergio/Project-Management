package org.sergio.project_management.controller;

import org.sergio.project_management.model.Employee;
import org.sergio.project_management.serviceimpl.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/employee")
@RestController
public class EmployeeController {
    @Autowired
    private EmployeeService service;
    //========================================================================================================//
    @GetMapping
    public List<Employee> getAllEmployees(@RequestParam(name = "includeTasks", defaultValue = "false") boolean includeTasks,
                                          @RequestParam(name = "includeProjects", defaultValue = "false") boolean includeProjects) {
        return service.getAll(includeTasks, includeProjects);
    }
    //========================================================================================================//
    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable("id") Integer id,
                                @RequestParam(name = "includeTasks", defaultValue = "false") boolean includeTasks,
                                @RequestParam(name = "includeProjects", defaultValue = "false") boolean includeProjects) {
        return service.get(id, includeTasks, includeProjects);
    }
    //========================================================================================================//
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Employee createEmployee(@RequestBody Employee employee) {
        return service.create(employee);
    }
    //========================================================================================================//
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable("id") Integer id, @RequestBody Employee employee) {
        return service.update(id, employee);
    }
    //========================================================================================================//
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable("id") Integer id) {
        service.delete(id);
    }
    //========================================================================================================//
}
