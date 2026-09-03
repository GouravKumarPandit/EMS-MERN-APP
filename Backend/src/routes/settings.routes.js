import express from "express";
import { fetchSetting, updateSettings } from "../controllers/settings.controller.js";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import settingsValidation from "../validators/settings.validator.js";
import validate from "../middleware/validation.middleware.js";
import { uploadCompanyLogo } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", isLoggedIn, fetchSetting);
router.post("/update-settings", isLoggedIn, isAdmin, uploadCompanyLogo, settingsValidation, validate, updateSettings);

export default router;
