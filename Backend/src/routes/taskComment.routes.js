import express from "express";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js";
import { getAllTaskComment, createTaskComment, getTaskCommentById, updateTaskComment, deleteTaskComment } from "../controllers/taskComment.controller.js";
import commentValidation from "../validators/comment.validator.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router({
    mergeParams: true
});

router.get("/", isLoggedIn, getAllTaskComment);
router.post("/", isLoggedIn, commentValidation, validate, createTaskComment);
router.get("/:id", isLoggedIn, getTaskCommentById);
router.put("/:id", isLoggedIn, commentValidation, validate, updateTaskComment);
router.delete("/:id", isLoggedIn, deleteTaskComment);

export default router;
