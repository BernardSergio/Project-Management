<div class="top-bar">
    <h1>Assign ${employee.firstName} ${employee.lastName} to Tasks</h1>
</div>
<form class="assign-form" action="/employees/${employee.id}/assignTask" method="post" data-form data-redirect="/employees/${employee.id}">
    <div>
        <table>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Due</th>
                    <th>Project</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <#if availableTasks?size gt 0>
                    <#list availableTasks as task>
                        <tr>
                            <td>
                                <input
                                    type="checkbox"
                                    name="taskIds"
                                    value="${task.id}"
                                    <#if employee.assignedTasks?seq_contains(task)>
                                checked
                </#if>
                >
                </td>
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
                </tr>
                </#list>
                <#else>
                    <tr>
                        <td colspan="8" style="text-align: center; padding: 20px;">
                            No available tasks for this employee.
                        </td>
                    </tr>
                    </#if>
            </tbody>
        </table>
    </div>
    <div class="form-actions">
        <button type="submit" class="submit">
            <i class="fa-solid fa-save"></i> Update Assigned Tasks
        </button>
        <button type="button" class="cancel" data-page="/employees">
            Cancel
        </button>
    </div>
</form>