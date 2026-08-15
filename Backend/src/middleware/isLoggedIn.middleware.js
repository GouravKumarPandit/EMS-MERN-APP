import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isLoggedIn = asyncHandler((req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return next(createError("Unauthorized Action!", 401));
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
        id: tokenData.id,
        username: tokenData.username,
        email: tokenData.email,
        role: tokenData.role
    };

    next();
});

export default isLoggedIn;