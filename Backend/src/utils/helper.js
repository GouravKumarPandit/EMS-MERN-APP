import { User } from "../models/user.model.js"
import createError from "./createError.js";

export const escapeRegex = (value = "") =>
    String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").slice(0, 100);

export const parsePagination = (query = {}) => {
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 10));

    return {
        page,
        limit,
        skip: (page - 1) * limit,
    };
};

export const idsEqual = (a, b) => {
    if (a == null || b == null) return false;
    return a.toString() === b.toString();
};

export const canAccessTask = (user, task) => {
    if (!task) return false;
    if (user?.role === "admin") return true;
    return idsEqual(task.assigned_staff, user?.id);
};

export const stripPassword = (user) => {
    if (!user) return user;
    const { password, ...safeUser } = user;
    return safeUser;
};

export const authCookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 1000,
};

export const clearAuthCookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
};

export const getUserById = async (userId) => {
    const user = await User.findById(userId).select("-password").lean();
    if (!user) throw createError("User not found!", 404);

    return user;
}

export const getUserFullNameById = async (userId) => {
    const user = await User.findById(userId).select("first_name last_name").lean();
    if (!user) throw createError("User not found!", 404);

    return `${user.first_name} ${user.last_name}`;
}
