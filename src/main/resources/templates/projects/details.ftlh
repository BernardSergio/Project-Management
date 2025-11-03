<div class="top-bar">
    <h1>Project Details</h1>
</div>
<section class="info">
    <div>
        <h2>
            ${project.name}
        </h2>
        <div class="button-group">
            <button data-page="/projects/${project.id}/edit"><i class="fa-solid fa-pen"></i> Edit Project</button>
            <button data-page="/projects"><i class="fa-solid fa-arrow-left"></i> Back to List</button>
        </div>
    </div>
    <hr />
    <div>
        <div>
            <p>Status: <span>
                    ${project.status.label!'-'}
                </span></p>
            <p>Project ID: <span>
                    ${project.id}
                </span></p>
        </div>
        <div>
            <p>Due Date: <span>
                    ${project.dueDate!'-'}
                </span></p>
            <p>Start Date: <span>
                    ${project.startDate!'-'}
                </span></p>
        </div>
    </div>
</section>
<hr />
<section class="lists">
    <div class="top-bar">
        <h3>Tasks</h3>
        <button data-page="/projects/${project.id}/addTask"><i class="fa-solid fa-plus"></i> Add Task</button>
    </div>
    <#if project.tasks?size gt 0>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Due</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <#list project.tasks as task>
                    <tr>
                        <td>
                            ${task.id}
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
                                    <a href="#" class="dropdown-item" data-page="tasks/${task.id}/edit">
                                        <i class="fa-solid fa-pen"></i>Edit
                                    </a>
                                    <a href="#" class="dropdown-item" data-page="tasks/${task.id}/assignEmployee">
                                        <i class="fa-solid fa-user-plus"></i>Assign Employees
                                    </a>
                                    <hr />
                                    <a href="#" class="dropdown-item danger" data-delete="task" data-delete-action="tasks/${task.id}/delete">
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
            <p>No tasks found.</p>
    </#if>
</section>
<hr />
<section class="lists">
    <div class="top-bar">
        <h3>Assigned Employees</h3>
        <button data-page="/projects/${project.id}/assignEmployee"><i class="fa-solid fa-user-plus"></i> Assign Employee</button>
    </div>
    <#if project.assignedEmployees?size gt 0>
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
                <#list project.assignedEmployees as emp>
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
            <p>No employees assigned to this project.</p>
    </#if>
</section>