<div class="top-bar">
    <h1>Employee Details</h1>
</div>
<section class="info">
    <div>
        <h2>
            ${employee.firstName!'-'} ${employee.lastName!'-'}
        </h2>
        <div class="button-group">
            <button data-page="/employees/${employee.id}/edit"><i class="fa-solid fa-pen"></i> Edit Employee</button>
            <button data-page="/employees"><i class="fa-solid fa-arrow-left"></i> Back to List</button>
        </div>
    </div>
    <p>
        ${employee.title!'-'}
    </p>
    <p>Employee ID: <span>
            ${employee.id}
        </span></p>
</section>
<hr>
<section class="lists">
    <div class="top-bar">
        <h3>Assigned Tasks</h3>
        <button data-page="/employees/${employee.id}/assignTask"><i class="fa-solid fa-user-plus"></i> Assign Task</button>
    </div>
    <#if employee.assignedTasks?size gt 0>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Due</th>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <#list employee.assignedTasks as task>
                    <tr>
                        <td>
                            ${task.id!'-'}
                        </td>
                        <td>
                            ${task.name!'-'}
                        </td>
                        <td>
                            ${task.description!'-'}
                        </td>
                        <td>
                            ${task.priority!'-'}
                        </td>
                        <td>
                            ${task.dueDate!'-'}
                        </td>
                        <td>
                            ${task.project?if_exists.name!'-'}
                        </td>
                        <td>
                            ${task.status.label!'-'}
                        </td>
                        <td>
                            <div class="action-menu">
                                <button class="action-trigger" aria-label="Actions" aria-haspopup="true">
                                    <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a href="#" class="dropdown-item" data-page="tasks/${task.id}">
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
            <p>No assigned tasks.</p>
    </#if>
</section>
<hr>
<section class="lists">
    <div class="top-bar">
        <h3>Assigned Projects</h3>
        <button data-page="/employees/${employee.id}/assignProject"><i class="fa-solid fa-user-plus"></i> Assign to Project</button>
    </div>
    <#if employee.assignedProjects?size gt 0>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Started</th>
                    <th>Due</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <#list employee.assignedProjects as proj>
                    <tr>
                        <td>
                            ${proj.id}
                        </td>
                        <td>
                            ${proj.name}
                        </td>
                        <td>
                            ${proj.startDate}
                        </td>
                        <td>
                            ${proj.dueDate}
                        </td>
                        <td>
                            ${proj.status.label!'-'}
                        </td>
                        <td>
                            <div class="action-menu">
                                <button class="action-trigger" aria-label="Actions" aria-haspopup="true">
                                    <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a href="#" class="dropdown-item" data-page="projects/${proj.id}">
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
            <p>No projects found.</p>
    </#if>
</section>