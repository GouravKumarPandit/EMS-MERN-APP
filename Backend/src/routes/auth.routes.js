import express from "express";
import { login, logout, profile } from "../controllers/auth.controller.js";
import loginValidation from "../validators/login.validator.js";
import validate from "../middleware/validation.middleware.js";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js";
import { loginLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/login", loginLimiter, loginValidation, validate, login);
router.post("/logout", logout);
router.get("/me", isLoggedIn, profile);

export default router;
