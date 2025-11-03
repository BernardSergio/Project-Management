<div class="top-bar">
    <h1>Edit Project</h1>
</div>
<div>
    <form
        class="project-form"
        action="/projects/${project.id}/edit"
        method="post"
        data-form
        data-redirect="/projects">
        <div class="form-group">
            <label for="name"> Project Name </label>
            <input
                type="text"
                name="name"
                value="${project.name!'-'}"
                required
                placeholder="Enter project name" />
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="startDate"> Start Date </label>
                <input
                    type="date"
                    name="startDate"
                    value="${project.startDate!'-'}"
                    required
                    placeholder="Enter project start date" />
            </div>
            <div class="form-group">
                <label for="dueDate"> Due Date </label>
                <input
                    type="date"
                    name="dueDate"
                    value="${project.dueDate!'-'}"
                    required
                    placeholder="Enter project due date" />
            </div>
            <div class="select" class="form-group" data-select>
                <label for="status"> Status </label>
                <div></div>
                <span>
                    ${project.status.label!'-'}
                </span>
                <input type="hidden" name="status" value="${project.status!''}" />
                <div>
                    <div class="action-menu">
                        <button type="button" class="action-trigger" aria-label="Actions" aria-haspopup="true">
                            <i class="fa-solid fa-chevron-down fa-lg"></i>
                        </button>
                        <div class="dropdown-menu">
                            <#list allStatuses as status>
                                <a href="#" class="dropdown-item" data-value="${status}">
                                    ${status.label!'-'}
                                </a>
                            </#list>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-actions">
            <button type="submit" class="submit">
                <i class="fa-solid fa-save"></i> Update Project
            </button>
            <button type="button" class="cancel" data-page="/projects">Cancel</button>
        </div>
    </form>
</div>