<div class="top-bar">
    <h1>Add New Employee</h1>
</div>
<div>
    <form
        class="employee-form"
        action="/employees/create"
        method="post"
        data-create
        data-form
        data-redirect="/employees">
        <div class="form-row">
            <div class="form-group">
                <label for="firstName">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstName"
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
                required
                placeholder="Enter job title">
        </div>
        <div class="form-actions">
            <button type="submit" class="submit">
                <i class="fa-solid fa-save"></i> Add Employee
            </button>
            <button type="button" class="cancel" data-page="/employees">
                Cancel
            </button>
        </div>
    </form>
</div>