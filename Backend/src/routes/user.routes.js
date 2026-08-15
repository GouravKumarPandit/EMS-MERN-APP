import express from "express";
import { dashboard, getAllStaff, createStaff, getStaffById, updateStaff, deleteStaff, changePassword } from "../controllers/user.controller.js";
import { updateSettings } from "../controllers/settings.controller.js";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js"
import createStaffValidation from "../validators/createStaff.validator.js";
import updateStaffValidation from "../validators/updateStaff.validator.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

// User URI
router.get("/dashboard", isLoggedIn, dashboard);

// Staff Routes 
router.get("/", isLoggedIn, getAllStaff);
router.post("/", isLoggedIn, createStaffValidation, validate, createStaff);
router.get("/:id", isLoggedIn, getStaffById);
router.put("/:id", isLoggedIn, updateStaffValidation, validate, updateStaff);
router.delete("/:id", isLoggedIn, deleteStaff);
router.put("/change-password/:id", isLoggedIn, changePassword);
router.post("/update-settings", isLoggedIn, updateSettings);

export default router;