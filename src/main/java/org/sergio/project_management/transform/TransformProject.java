package org.sergio.project_management.transform;

import org.sergio.project_management.entity.ProjectData;
import org.sergio.project_management.model.Project;

public class TransformProject {

    public static Project toModel(ProjectData data) {
        if (data == null) return null;
        Project project = new Project();
        project.setId(data.getId());
        project.setName(data.getName());
        project.setStartDate(data.getStartDate());
        project.setDueDate(data.getDueDate());
        project.setStatus(data.getStatus());
        project.setCreatedAt(data.getCreatedAt());
        project.setUpdatedAt(data.getUpdatedAt());

        return project;
    }

    public static ProjectData toData(Project model) {
        if (model == null) return null;
        ProjectData projectData = new ProjectData();
        projectData.setId(model.getId());
        projectData.setName(model.getName());
        projectData.setStartDate(model.getStartDate());
        projectData.setDueDate(model.getDueDate());
        projectData.setStatus(model.getStatus());
        projectData.setCreatedAt(model.getCreatedAt());
        projectData.setUpdatedAt(model.getUpdatedAt());

        return projectData;
    }
}
