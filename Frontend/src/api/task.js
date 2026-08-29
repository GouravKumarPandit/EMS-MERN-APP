import api from "./apiConfigure";

export const getAllTask = (search = "", status = "", priority = "", staff = "") => {
    return api.get("/api/tasks", {
        params: {
            search,
            status,
            priority, 
            staff
        }
    });
}

export const createTask = (formData) => {
    return api.post("/api/tasks", formData);
}

export const getTaskById = (id) => {
    return api.get(`/api/tasks/${id}`);
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
