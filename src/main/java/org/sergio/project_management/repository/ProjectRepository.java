package org.sergio.project_management.repository;

import org.sergio.project_management.entity.ProjectData;
import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository  extends CrudRepository<ProjectData, Integer> {
}
