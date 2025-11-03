package org.sergio.project_management.repository;

import org.sergio.project_management.entity.EmployeeData;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<EmployeeData, Integer> {
}
