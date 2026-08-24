import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, logoutApi, profileApi } from "../api/auth";
import api from "../api/apiConfigure";

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [user, setUser] = useState({});
    const [authLoading, setAuthLoading] = useState(true);

    const login = async (formData) => {
        const response = await loginApi(formData);

        if(response.data.success) {
            setUser(response.data.data);
        }

        return response.data;
    }

    const logout = async () => {
        try {
            await logoutApi();
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    const getCurrentUser = () => {
        return api.get("/api/auth/me");
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getCurrentUser();
                if (response.data.success) {
                    setUser(response.data.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, authLoading, getCurrentUser, isAdmin: user?.role === "admin" }} >
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
