import api from "./apiConfigure";

export const dashboard = () => {
    return api.get("/api/staff/dashboard");
}

export const getAllStaff = (search = "", role = "", gender = "") => {
    return api.get("/api/staff", {
        params: {
            search,
            role,
            gender
        }
    });
};

export const createStaff = (formData) => {
    return api.post("/api/staff", formData);
}

export const getStaffById = (id) => {
    return api.get(`/api/staff/${id}`);
}

export const updateStaff = (id, formData) => {
    return api.put(`/api/staff/${id}`, formData);
}

export const deleteStaff = (id) => {
    return api.delete(`/api/staff/${id}`);
}

export const changePassword = (id, formData) => {
    return api.put(`/api/staff/change-password/${id}`, formData);
}

