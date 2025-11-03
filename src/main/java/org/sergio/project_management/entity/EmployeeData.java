package org.sergio.project_management.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "employees")
public class EmployeeData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private String title;


    // Relationships ======================================= //

    // Many-to-many with tasks
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "employee_tasks", // join table name
            joinColumns = @JoinColumn(name = "employee_id"), // FK to employee
            inverseJoinColumns = @JoinColumn(name = "task_id") // FK to task
    )
    private List<TaskData> assignedTasks;


    // Many-to-many with projects
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "employee_projects", // join table name
            joinColumns = @JoinColumn(name = "employee_id"), // FK to employee
            inverseJoinColumns = @JoinColumn(name = "project_id") // FK to project
    )
    private List<ProjectData> assignedProjects;
}
