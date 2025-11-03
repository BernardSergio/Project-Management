<div class="top-bar">
    <h1>Edit Task</h1>
</div>
<div>
    <form
        class="task-form"
        action="/tasks/${task.id}/edit"
        method="post"
        data-form
        data-redirect="/tasks/${task.id}">
        <div class="form-group">
            <label for="name">
                Task Name
            </label>
            <input
                type="text"
                name="name"
                value="${task.name!'-'}"
                required
                placeholder="Enter task name">
        </div>
        <div class="form-group">
            <label for="description">
                Description
            </label>
            <input
                type="text"
                name="description"
                value="${task.description!'-'}"
                required
                placeholder="Enter task description">
        </div>
        <div class="form-row">
            <div class="select form-group" data-select>
                <label for="priority"> Priority </label>
                <span>
                    ${task.priority!'-'}
                </span>
                <input type="hidden" name="priority" value="${task.priority!'-'}" />
                <div>
                    <div class="action-menu">
                        <button type="button" class="action-trigger" aria-label="Actions" aria-haspopup="true">
                            <i class="fa-solid fa-chevron-down fa-lg"></i>
                        </button>
                        <div class="dropdown-menu">
                            <#list allPriorities as priority>
                                <a href="#" class="dropdown-item" data-value="${priority}">
                                    ${priority!'-'}
                                </a>
                            </#list>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="dueDate">
                    Due Date
                </label>
                <input
                    type="date"
                    name="dueDate"
                    value="${task.dueDate!'-'}"
                    required
                    placeholder="Set due date">
            </div>
            <div class="select" class="form-group" data-select>
                <label for="status"> Status </label>
                <div></div>
                <span>
                    ${task.status.label!'-'}
                </span>
                <input type="hidden" name="status" value="${task.status!'-'}" />
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
        <#--=======================================================================-->
            <div class="form-actions">
                <button type="submit" class="submit">
                    <i class="fa-solid fa-save"></i> Update Task
                </button>
                <button type="button" class="cancel" data-page="/tasks">
                    Cancel
                </button>
            </div>
    </form>
</div>