import createError from "../utils/createError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isAdmin = asyncHandler((req, res, next) => {
    if (req.user?.role !== "admin") {
        return next(createError("Admin access required!", 403));
    }

    next();
});

export default isAdmin;
