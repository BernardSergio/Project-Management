package org.sergio.project_management.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Employee {

    private Integer id;
    private String firstName;
    private String lastName;
    private String title;
    private List<Task> assignedTasks;
    private List<Project> assignedProjects;
}