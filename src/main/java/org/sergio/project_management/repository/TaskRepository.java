package org.sergio.project_management.repository;

import org.sergio.project_management.entity.TaskData;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<TaskData, Integer> {
    List<TaskData> findByProjectIdIn(List<Integer> projectIds);
}
