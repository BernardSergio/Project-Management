<div class="top-bar">
    <h1>Assign Employees to ${project.name}
    </h1>
</div>
<form class="assign-form" action="/projects/${project.id}/assignEmployee" method="post" data-form data-redirect="/projects/${project.id}">
    <div>
        <table>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                <#list allEmployees as emp>
                    <tr>
                        <td>
                            <input
                                type="checkbox"
                                name="employeeIds"
                                value="${emp.id}"
                                <#if project.assignedEmployees?seq_contains(emp)>
                            checked
                            </#if>
                            >
                        </td>
                        <td>
                            ${emp.id}
                        </td>
                        <td>
                            ${emp.firstName!'-'} ${emp.lastName!'-'}
                        </td>
                        <td>
                            ${emp.title!'-'}
                        </td>
                    </tr>
                </#list>
            </tbody>
        </table>
    </div>
    <div class="form-actions">
        <button type="submit" class="submit">
            <i class="fa-solid fa-save"></i> Update Assigned Employees
        </button>
        <button type="button" class="cancel" data-page="/projects">
            Cancel
        </button>
    </div>
</form>