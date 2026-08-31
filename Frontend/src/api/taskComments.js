import api from "./apiConfigure";

export const getAllTaskComment = (taskId) => {
    return api.get(`/api/tasks/${taskId}/comment`);
}

export const createTaskComment = (taskId, formData) => {
    return api.post(`/api/tasks/${taskId}/comment`, formData);
}

export const getTaskCommentById = (taskId, id) => {
    return api.get(`/api/tasks/${taskId}/comment/${id}`);
}

export const updateTaskComment = (taskId, id, formData) => {
    return api.put(`/api/tasks/${taskId}/comment/${id}`, formData);
}

export const deleteTaskComment = (taskId, id) => {
    return api.delete(`/api/tasks/${taskId}/comment/${id}`);
}
