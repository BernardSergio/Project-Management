package org.sergio.project_management.transform;

import org.sergio.project_management.entity.EmployeeData;
import org.sergio.project_management.model.Employee;

public class TransformEmployee {
    public static Employee toModel(EmployeeData data) {
        if (data == null) return null;
        Employee employee = new Employee();
        employee.setId(data.getId());
        employee.setFirstName(data.getFirstName());
        employee.setLastName(data.getLastName());
        employee.setTitle(data.getTitle());
        return employee;
    }

    public static EmployeeData toData(Employee model) {
        if (model == null) return null;
        EmployeeData employeeData = new EmployeeData();
        employeeData.setId(model.getId());
        employeeData.setFirstName(model.getFirstName());
        employeeData.setLastName(model.getLastName());
        employeeData.setTitle(model.getTitle());

        return employeeData;
    }
}
