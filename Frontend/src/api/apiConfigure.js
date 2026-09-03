import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url || "";
        const isAuthRequest = url.includes("/api/auth/login") || url.includes("/api/auth/me");

        if (status === 401 && !isAuthRequest && window.location.pathname !== "/login") {
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;
