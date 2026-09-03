import mongoose from "mongoose";
import { Task } from "../models/task.model.js";
import { TaskComment } from "../models/taskComment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import createError from "../utils/createError.js";
import { canAccessTask, idsEqual } from "../utils/helper.js";

const getAccessibleTask = async (req, next) => {
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        next(createError("Invalid task id!", 400));
        return null;
    }

    const task = await Task.findById(taskId).lean();
    if (!task) {
        next(createError("Task not found!", 404));
        return null;
    }

    if (!canAccessTask(req.user, task)) {
        next(createError("Unauthorized action!", 403));
        return null;
    }

    return task;
};

export const getAllTaskComment = asyncHandler(async (req, res, next) => {
    const task = await getAccessibleTask(req, next);
    if (!task) return;

    const taskComment = await TaskComment.find({ task: task._id })
        .populate("comment_by", "first_name last_name")
        .lean();

    return res.status(200).json({
        success: true,
        data: taskComment
    });
});

export const createTaskComment = asyncHandler(async (req, res, next) => {
    const task = await getAccessibleTask(req, next);
    if (!task) return;

    const { id: staffId } = req.user;
    const { comment } = req.body;
    const comment_id = Date.now();

    const taskComment = new TaskComment({
        task: task._id,
        comment,
        comment_id,
        comment_by: new mongoose.Types.ObjectId(staffId),
    });
    await taskComment.save();

    return res.status(201).json({
        success: true,
        message: "Comment added successfully!",
        data: taskComment
    });
});

export const getTaskCommentById = asyncHandler(async (req, res, next) => {
    const task = await getAccessibleTask(req, next);
    if (!task) return;

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError("Invalid comment id!", 400));

    const comment = await TaskComment.findOne({
        task: task._id,
        _id: new mongoose.Types.ObjectId(id)
    })
    .populate("comment_by", "first_name last_name")
    .lean();

    if (!comment) return next(createError("Comment not found!", 404));

    return res.status(200).json({
        success: true,
        message: "Comment found!",
        data: comment
    });
});

export const updateTaskComment = asyncHandler(async (req, res, next) => {
    const task = await getAccessibleTask(req, next);
    if (!task) return;

    const { id: staffId } = req.user;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError("Invalid comment id!", 400));

    const updateComment = await TaskComment.findOne({
        _id: new mongoose.Types.ObjectId(id),
        task: task._id
    });

    if (!updateComment) return next(createError("Comment not found!", 404));
    if (!idsEqual(updateComment.comment_by, staffId)) return next(createError("Unauthorized action!", 403));

    const { comment } = req.body;
    updateComment.comment = comment;
    await updateComment.save();

    return res.status(200).json({
        success: true,
        message: "Comment updated successfully!",
        data: updateComment
    });
});

export const deleteTaskComment = asyncHandler(async (req, res, next) => {
    const task = await getAccessibleTask(req, next);
    if (!task) return;

    const { id: staffId } = req.user;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError("Invalid comment id!", 400));

    const comment = await TaskComment.findOne({
        task: task._id,
        _id: new mongoose.Types.ObjectId(id)
    });

    if (!comment) return next(createError("Comment not found!", 404));
    if (!idsEqual(comment.comment_by, staffId)) return next(createError("Unauthorized action!", 403));

    await comment.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Comment deleted successfully!"
    });
});
