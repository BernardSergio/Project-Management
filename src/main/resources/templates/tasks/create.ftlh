<div class="top-bar">
    <h1>Add New Task</h1>
</div>
<div>
    <form
        class="task-form"
        action="/tasks/create"
        method="post"
        data-form
        data-redirect="/tasks">
        <div class="form-group">
            <label for="name">
                Task Name
            </label>
            <input
                type="text"
                name="name"
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
                required
                placeholder="Enter task description">
        </div>
        <div class="form-row">
            <div class="select form-group" data-select>
                <label for="priority"> Priority </label>
                <span>
                    Set Priority
                </span>
                <input type="hidden" name="priority" />
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
                    required
                    placeholder="Set due date">
            </div>
            <div class="select form-group" data-select>
                <label for="project.id"> Project </label>
                <span>
                    Select a project
                </span>
                <input type="hidden" name="project.id" required />
                <div>
                    <div class="action-menu">
                        <button type="button" class="action-trigger" aria-label="Actions" aria-haspopup="true">
                            <i class="fa-solid fa-chevron-down fa-lg"></i>
                        </button>
                        <div class="dropdown-menu">
                            <#list allProjects as project>
                                <a href="#" class="dropdown-item" data-value="${project.id}">
                                    ${project.name!'-'}
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
                    <i class="fa-solid fa-save"></i> Add Task
                </button>
                <button type="button" class="cancel" data-page="/tasks">
                    Cancel
                </button>
            </div>
    </form>
</div>