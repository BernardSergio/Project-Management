package org.sergio.project_management.transform;

import org.sergio.project_management.entity.TaskData;
import org.sergio.project_management.model.Task;

public class TransformTask {
    public static Task toModel(TaskData data) {
        if (data == null) return null;
        Task task = new Task();
        task.setId(data.getId());
        task.setName(data.getName());
        task.setDescription(data.getDescription());
        task.setPriority(data.getPriority());
        task.setDueDate(data.getDueDate());
        task.setProject(TransformProject.toModel(data.getProject()));
        task.setStatus(data.getStatus());
        task.setCreatedAt(data.getCreatedAt());
        task.setUpdatedAt(data.getUpdatedAt());

        return task;
    }

    public static TaskData toData(Task model) {
        if (model == null) return null;
        TaskData taskData = new TaskData();
        taskData.setId(model.getId());
        taskData.setName(model.getName());
        taskData.setDescription(model.getDescription());
        taskData.setPriority(model.getPriority());
        taskData.setDueDate(model.getDueDate());
        taskData.setProject(TransformProject.toData(model.getProject()));
        taskData.setStatus(model.getStatus());
        taskData.setCreatedAt(model.getCreatedAt());
        taskData.setUpdatedAt(model.getUpdatedAt());

        return taskData;
    }
}
