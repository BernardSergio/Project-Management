package org.sergio.project_management.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.sergio.project_management.enums.Priority;
import org.sergio.project_management.enums.Status;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "tasks")
public class TaskData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate dueDate;

    @UpdateTimestamp
    @JsonFormat(pattern = "MM dd, yyyy - hh:mm a", timezone = "GMT+08:00")
    private LocalDateTime updatedAt;

    @CreationTimestamp
    @JsonFormat(pattern = "MM dd, yyyy - hh:mm a", timezone = "GMT+08:00")
    private LocalDateTime createdAt;

    // Relationships ======================================= //

    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectData project;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "assignedTasks")
    private List<EmployeeData> assignedEmployees;

}
