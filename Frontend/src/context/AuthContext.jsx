import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, logoutApi } from "../api/auth";
import api from "../api/apiConfigure";

const AuthContext = createContext(null);

const sanitizeUser = (data) => {
    if (!data) return null;
    const { password, ...safeUser } = data;
    return safeUser;
};

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const login = async (formData) => {
        const response = await loginApi(formData);

        if(response.data.success) {
            setUser(sanitizeUser(response.data.data));
        }

        return response.data;
    }

    const logout = async () => {
        try {
            await logoutApi();
        } catch (error) {
            console.error(error);
        } finally {
            setUser(null);
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
                    setUser(sanitizeUser(response.data.data));
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
