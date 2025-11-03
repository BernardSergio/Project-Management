package org.sergio.project_management.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.sergio.project_management.enums.Status;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "projects")
public class ProjectData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private LocalDate startDate;
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    @UpdateTimestamp
    @JsonFormat(pattern = "MM dd, yyyy - hh:mm a", timezone = "GMT+08:00")
    private LocalDateTime updatedAt;

    @CreationTimestamp
    @JsonFormat(pattern = "MM dd, yyyy - hh:mm a", timezone = "GMT+08:00")
    private LocalDateTime createdAt;

    // Relationships ======================================= //

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaskData> tasks;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "assignedProjects")
    private List<EmployeeData> assignedEmployees;


}