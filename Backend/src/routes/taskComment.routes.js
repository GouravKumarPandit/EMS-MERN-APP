import express from "express";
import isLoggedIn from "../middleware/isLoggedin.middleware.js";
import { getAllTaskComment, createTaskComment, getTaskCommentById, updateTaskComment, deleteTaskComment } from "../controllers/taskComment.controller.js"

const router = express.Router();

router.get("/", isLoggedIn, getAllTaskComment);
router.post("/", isLoggedIn, createTaskComment);
router.get("/:id", isLoggedIn, getTaskCommentById);
router.put("/:id", isLoggedIn, updateTaskComment);
router.delete("/:id", isLoggedIn, deleteTaskComment);

export default router; 