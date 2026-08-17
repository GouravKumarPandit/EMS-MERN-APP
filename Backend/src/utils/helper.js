import { User } from "../models/user.model.js"
import createError from "./createError.js";

export const getUserById = async (userId) => {
    const user = await User.getUserById(userId).lean();
    if(!user) throw createError('User not found!', 404); 

    return user;
}

export const getUserFullNameById = async (userId) => {
    const user = await User.getUserById(userId).lean();
    if(!user) throw createError('User not found!', 404); 

    return `${user.first_name} ${user.last_name}`;
}
