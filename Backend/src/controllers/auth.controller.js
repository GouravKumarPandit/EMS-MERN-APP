import asyncHandler from "../utils/asyncHandler.js";
import createError from "../utils/createError.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authCookieOptions, stripPassword, clearAuthCookieOptions } from "../utils/helper.js";

export const login = asyncHandler(async (req, res, next) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    const user = await User.findOne({ username }).lean();
    const isMatch = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isMatch) {
        return next(createError("Invalid username or password!", 401));
    }

    const jwtData = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }

    const token = jwt.sign(
        jwtData,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, authCookieOptions);

    return res.status(200).json({
        success: true,
        message: "Logged in successfully!",
        data: stripPassword(user)
    })
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token", clearAuthCookieOptions);

    return res.status(200).json({
        success: true,
        message: "User logged-out successfully!",
        data: null
    });
});

export const profile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-password").lean();

    if (!user) {
        return next(createError("User not found!", 404));
    }

    return res.status(200).json({
        success: true,
        data: user
    });
});
