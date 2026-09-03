import express from "express";
import { getAllTask, createTask, getTaskById, getTaskActivities, updateTask, changeStatus, deleteTask } from "../controllers/task.controller.js";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import createTaskValidation from "../validators/createTask.validator.js";
import updateTaskValidation from "../validators/updateTask.validator.js";
import changeTaskStatusValidation from "../validators/changeTaskStatus.validator.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

router.get("/", isLoggedIn, getAllTask);
router.post("/", isLoggedIn, isAdmin, createTaskValidation, validate, createTask);
router.get("/:id/activities", isLoggedIn, getTaskActivities);
router.get("/:id", isLoggedIn, getTaskById);
router.put("/:id", isLoggedIn, updateTaskValidation, validate, updateTask);
router.put("/:id/status", isLoggedIn, changeTaskStatusValidation, validate, changeStatus);
router.delete("/:id", isLoggedIn, deleteTask);

export default router;
