import api from "./apiConfigure";

export const getAllNotes = (search = "") => {
    return api.get("/api/notes", {
        params: {
            search
        }
    });
}

export const createNotes = (formData) => {
    return api.post("/api/notes", formData);
}

export const getNoteById = (id) => {
    return api.get(`/api/notes/${id}`);
}

export const updateNote = (id, formData) => {
    return api.put(`/api/notes/${id}`, formData);
}

export const deleteNote = (id) => {
    return api.delete(`/api/notes/${id}`);
}
