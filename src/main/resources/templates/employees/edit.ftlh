<div class="top-bar">
    <h1>Edit Employee</h1>
</div>
<div>
    <form
        class="employee-form"
        action="/employees/${employee.id}/edit"
        method="post"
        data-form
        data-redirect="/employees/${employee.id}">
        <div class="form-row">
            <div class="form-group">
                <label for="firstName">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstName"
                    value="${employee.firstName!'-'}"
                    required
                    placeholder="Enter first name">
            </div>
            <div class="form-group">
                <label for="lastName">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastName"
                    value="${employee.lastName!'-'}"
                    required
                    placeholder="Enter last name">
            </div>
        </div>
        <div class="form-group">
            <label for="title">
                Job Title
            </label>
            <input
                type="text"
                name="title"
                value="${employee.title!'-'}"
                required
                placeholder="Enter job title">
        </div>
        <div class="form-actions">
            <button type="submit" class="submit">
                <i class="fa-solid fa-save"></i> Update Employee
            </button>
            <button type="button" class="cancel">
                Cancel
            </button>
        </div>
    </form>
</div>