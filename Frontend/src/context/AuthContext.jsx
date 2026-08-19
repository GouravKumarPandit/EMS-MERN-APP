import { createContext, useContext, useState } from "react";
import { loginApi, logoutApi } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [user, setUser] = useState({});

    const login = async (formData) => {
        const response = await loginApi(formData);

        if(response.data.success) {
            setUser(response.data.data);

            return response.data;
        }
    }

    const logout = async () => {
        const data = await logoutApi();
        console.log(data.response)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === "admin" }} >
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
