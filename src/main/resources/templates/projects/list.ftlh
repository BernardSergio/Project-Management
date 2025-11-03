<div class="top-bar">
    <h1>Projects</h1>
    <button data-page="/projects/create"><i class="fa-solid fa-plus fa-lg"></i> Add New Project</button>
</div>
<#if projects?size gt 0>
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
            <#list projects as proj>
                <tr>
                    <td>
                        ${proj.id!'-'}
                    </td>
                    <td>
                        ${proj.name!'-'}
                    </td>
                    <td>
                        ${proj.startDate!'-'}
                    </td>
                    <td>
                        ${proj.dueDate!'-'}
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
                                <a href="#" class="dropdown-item" data-page="projects/${proj.id}/edit">
                                    <i class="fa-solid fa-pen"></i>Edit
                                </a>
                                <a href="#" class="dropdown-item" data-page="projects/${proj.id}/assignEmployee">
                                    <i class="fa-solid fa-user-plus"></i>Assign Employees
                                </a>
                                <a href="#" class="dropdown-item" data-page="projects/${proj.id}/addTask">
                                    <i class="fa-solid fa-plus"></i>Add Tasks
                                </a>
                                <hr />
                                <a href="#" class="dropdown-item danger" data-delete="project" data-delete-action="projects/${proj.id}/delete">
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
        <p>No projects found.</p>
</#if>