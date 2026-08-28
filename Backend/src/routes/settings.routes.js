import express from "express";
import { fetchSetting, updateSettings } from "../controllers/settings.controller.js";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js";

const router = express.Router();

// Staff Routes 
router.get("/", isLoggedIn, fetchSetting);
router.post("/update-settings", isLoggedIn, updateSettings);

export default router;