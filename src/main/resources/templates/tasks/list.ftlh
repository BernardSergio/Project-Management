<div class="top-bar">
    <h1>Tasks</h1>
    <button data-page="/tasks/create"><i class="fa-solid fa-plus fa-lg"></i> Add New Task</button>
</div>
<#if tasks?size gt 0>
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
            <#list tasks as task>
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