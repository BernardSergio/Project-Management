<div class="top-bar">
    <h1>Employees</h1>
    <button data-page="employees/create"><i class="fa-solid fa-plus fa-lg"></i> Add New Employee</button>
</div>
<#if employees?size gt 0>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Title</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <#list employees as emp>
                <tr>
                    <td>
                        ${emp.id!'-'}
                    </td>
                    <td>
                        ${emp.firstName!'-'} ${emp.lastName!'-'}
                    </td>
                    <td>
                        ${emp.title!'-'}
                    </td>
                    <td>
                        <div class="action-menu">
                            <button type="button" class="action-trigger" aria-label="Actions" aria-haspopup="true">
                                <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a href="#" class="dropdown-item" data-page="employees/${emp.id}">
                                    <i class="fa-solid fa-eye"></i>View Details
                                </a>
                                <a href="#" class="dropdown-item" data-page="employees/${emp.id}/edit">
                                    <i class="fa-solid fa-pen"></i>Edit
                                </a>
                                <a href="#" class="dropdown-item" data-page="employees/${emp.id}/assignTask">
                                    <i class="fa-solid fa-plus"></i>Assign Task
                                </a>
                                <a href="#" class="dropdown-item" data-page="employees/${emp.id}/assignProject">
                                    <i class="fa-solid fa-user-plus"></i>Assign to Project
                                </a>
                                <hr />
                                <a href="#" class="dropdown-item danger" data-delete="employee" data-delete-action="employees/${emp.id}/delete">
                                    <i class="fa-solid fa-trash"></i>Delete
                                </a>
                            </div>
                        </div>
                    </td>
                </tr>
            </#list>
        </tbody>
    </table>
    <#else>
        <p>No employees found.</p>
</#if>