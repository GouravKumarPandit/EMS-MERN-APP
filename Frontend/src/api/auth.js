import api from './apiConfigure';

// Auth
export const loginApi = (data) => {
    return api.post("/api/auth/login", data);
}

export const logoutApi = () => {
    return api.post("/api/auth/logout");
}

export const profile = () => {
    return api.get("/api/auth/me");
}

