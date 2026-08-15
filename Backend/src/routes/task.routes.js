import express from "express";
import { getAllTask, createTask, getTaskById, updateTask, changeStatus, deleteTask } from "../controllers/task.controller.js";
import isLoggedIn from "../middleware/isLoggedin.middleware.js";
import createTaskValidation from "../validators/createTask.validator.js";
import updateTaskValidation from "../validators/updateTask.validator.js";
import changeTaskStatusValidation from "../validators/changeTaskStatus.validator.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

// router.get("/create", taskController.createTask);
router.get("/", isLoggedIn, getAllTask);
router.post("/", isLoggedIn, createTaskValidation, validate, createTask);
router.get("/:id", isLoggedIn, getTaskById);
router.put("/:id", isLoggedIn, updateTaskValidation, validate, updateTask);
router.put("/:id/status", isLoggedIn, changeTaskStatusValidation, validate, changeStatus);
router.delete("/:id", isLoggedIn, deleteTask);

export default router;