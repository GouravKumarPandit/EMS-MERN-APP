import api from "./apiConfigure";

export const settings = () => {
    return api.get("/api/settings");
}

export const updateSettings = (formData) => {
    return api.post("/api/settings/update-settings", formData, {
        headers: {
            "Content-Type": undefined,
        },
    });
}
