<div class="top-bar">
    <h1>Add New Project</h1>
</div>
<div>
    <form
        class="project-form"
        action="/projects/create"
        method="post"
        data-form
        data-redirect="/projects">
        <div class="form-group">
            <label for="name">
                Project Name
            </label>
            <input
                type="text"
                name="name"
                required
                placeholder="Enter project name">
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
        <div class="form-actions">
            <button type="submit" class="submit">
                <i class="fa-solid fa-save"></i> Add Project
            </button>
            <button type="button" class="cancel" data-page="/projects">
                Cancel
            </button>
        </div>
    </form>
</div>