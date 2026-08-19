import api from "./apiConfigure";

export const updateSettings = (formData) => {
    return api.post("/api/staff/update-settings", formData);
}
