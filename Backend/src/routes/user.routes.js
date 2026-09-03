import express from "express";
import { dashboard, getAllStaff, getFilterAllStaff, createStaff, getStaffById, updateStaff, deleteStaff, changePassword } from "../controllers/user.controller.js";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import createStaffValidation from "../validators/createStaff.validator.js";
import updateStaffValidation from "../validators/updateStaff.validator.js";
import changePasswordValidation from "../validators/changePassword.validator.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

router.get("/dashboard", isLoggedIn, dashboard);
router.put("/change-password/:id", isLoggedIn, changePasswordValidation, validate, changePassword);
router.get("/filter", isLoggedIn, isAdmin, getFilterAllStaff);

router.get("/", isLoggedIn, isAdmin, getAllStaff);
router.post("/", isLoggedIn, isAdmin, createStaffValidation, validate, createStaff);
router.get("/:id", isLoggedIn, isAdmin, getStaffById);
router.put("/:id", isLoggedIn, isAdmin, updateStaffValidation, validate, updateStaff);
router.delete("/:id", isLoggedIn, isAdmin, deleteStaff);

export default router;
