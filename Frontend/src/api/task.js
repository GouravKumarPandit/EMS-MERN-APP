import api from "./apiConfigure";

export const getAllTask = (search = "", status = "", priority = "", staff = "", page = 1, limit = 10) => {
    return api.get("/api/tasks", {
        params: {
            search,
            status,
            priority, 
            staff,
            page,
            limit
        }
    });
}

export const createTask = (formData) => {
    return api.post("/api/tasks", formData);
}

export const getTaskById = (id) => {
    return api.get(`/api/tasks/${id}`);
}

export const getTaskActivities = (id, type = "") => {
    return api.get(`/api/tasks/${id}/activities`, {
        params: {
            type
        }
    });
}

export const updateTask = (id, formData) => {
    return api.put(`/api/tasks/${id}`, formData);
}

export const changeStatus = (id, formData) => {
    return api.put(`/api/tasks/${id}/status`, formData);
}

export const deleteTask = (id) => {
    return api.delete(`/api/tasks/${id}`);
}
