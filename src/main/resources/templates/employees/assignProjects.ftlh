<div class="top-bar">
    <h1>Assign ${employee.firstName} ${employee.lastName} to Projects</h1>
</div>
<form class="assign-form" action="/employees/${employee.id}/assignProject" method="post" data-form data-redirect="/employees/${employee.id}">
    <div>
        <table>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Started</th>
                    <th>Due</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <#list allProjects as proj>
                    <tr>
                        <td>
                            <input
                                type="checkbox"
                                name="projectIds"
                                value="${proj.id}"
                                <#if employee.assignedProjects?seq_contains(proj)>
                            checked
                            </#if>
                            >
                        </td>
                        <td>
                            ${proj.id}
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
                    </tr>
                </#list>
            </tbody>
        </table>
    </div>
    <div class="form-actions">
        <button type="submit" class="submit">
            <i class="fa-solid fa-save"></i> Update Assigned Projects
        </button>
        <button type="button" class="cancel" data-page="/employees">
            Cancel
        </button>
    </div>
</form>