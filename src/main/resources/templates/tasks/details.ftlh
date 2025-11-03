<div class="top-bar">
    <h1>Task Details</h1>
</div>
<section class="info">
    <div>
        <h2>
            ${task.name}
        </h2>
        <div class="button-group">
            <button data-page="/tasks/${task.id}/edit"><i class="fa-solid fa-pen"></i> Edit Task</button>
            <button data-page="/tasks"><i class="fa-solid fa-arrow-left"></i> Back to List</button>
        </div>
    </div>
    <div>
        <p class="description">
            ${task.description!'-'}
        </p>
    </div>
    <hr />
    <div>
        <div>
            <p>Status: <span>
                    ${task.project.name!'-'}
                </span></p>
            <p>Task ID: <span>
                    ${task.id}
            </p>
        </div>
        <div>
            <p>Status: <span>
                    ${task.status.label!'-'}
                </span></p>
            <p>Due Date: <span>
                    ${task.dueDate!'-'}
                </span></p>
        </div>
        <div>
            <p>Priority: <span>
                    ${task.priority!'-'}
                </span></p>
        </div>
    </div>
</section>
<hr />
<section class="lists">
    <div class="top-bar">
        <h3>Assigned Employees</h3>
        <button data-page="/tasks/${task.id}/assignEmployee"><i class="fa-solid fa-user-plus"></i> Assign Employee</button>
    </div>
    <#if task.assignedEmployees?size gt 0>
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
                <#list task.assignedEmployees as emp>
                    <tr>
                        <td>
                            ${emp.id}
                        </td>
                        <td>
                            ${emp.firstName} ${emp.lastName}
                        </td>
                        <td>
                            ${emp.title}
                        </td>
                        <td>
                            <div class="action-menu">
                                <button class="action-trigger" aria-label="Actions" aria-haspopup="true">
                                    <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a href="#" class="dropdown-item" data-page="employees/${emp.id}">
                                        <i class="fa-solid fa-eye"></i>View Details
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
</section>