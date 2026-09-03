import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const isLoggedIn = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(createError("Unauthorized Action!", 401));
    }

    if (!process.env.JWT_SECRET) {
        return next(createError("Server configuration error!", 500));
    }

    let tokenData;
    try {
        tokenData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(createError("Session expired. Please log in again.", 401));
        }
        return next(createError("Unauthorized Action!", 401));
    }

    const user = await User.findById(tokenData.id).select("-password").lean();
    if (!user) {
        return next(createError("Unauthorized Action!", 401));
    }

    req.user = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
    };

    next();
});

export default isLoggedIn;
