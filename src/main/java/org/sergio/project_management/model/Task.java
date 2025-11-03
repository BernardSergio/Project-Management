package org.sergio.project_management.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.sergio.project_management.enums.Priority;
import org.sergio.project_management.enums.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Task {
    private Integer id;
    private String name;
    private String description;
    private Priority priority;
    private LocalDate dueDate;
    private Project project;
    private Status status;
    private List<Employee> assignedEmployees;

    @JsonFormat(pattern = "MMMM dd, yyyy - hh:mm a", timezone = "GMT+08:00")
    private LocalDateTime updatedAt;

    @JsonFormat(pattern = "MMMM dd, yyyy - hh:mm a", timezone = "GMT+08:00")
    private LocalDateTime createdAt;
}
