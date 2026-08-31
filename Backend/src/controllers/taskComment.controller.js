import { TaskComment } from "../models/taskComment.model.js";
import asyncHandler from "../utils/asyncHandler";

export const getAllTaskComment = asyncHandler(async (req, res, next) => {
    const { taskId } = req.params;
    const taskComment = await TaskComment.find({ task: new mongoose.Types.ObjectId(taskId) }).populate("comment_by", "first_name last_name").lean();

    return res.status(200).json({
        success: true, 
        data: taskComment
    });
});

export const createTaskComment = asyncHandler(async (req, res, next) => {
    const { id: staffId } = req.user; 
    const { taskId } = req.params;
    const { comment } = req.body; 
    const comment_id = Date.now();

    const taskComment = new TaskComment({
        task: new mongoose.Types.ObjectId(taskId),
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
    const { taskId, id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(taskId)) return next(createError('Invalid task id!', 400)); 
    if(!mongoose.Types.ObjectId.isValid(id)) return next(createError('Invalid comment id!', 400)); 

    const comment = await TaskComment.findOne({ 
        task: new mongoose.Types.ObjectId(taskId),
        _id: new mongoose.Types.ObjectId(id)
    })
    .populate("comment_by", "first_name last_name")
    .lean();

    if(!comment) return next(createError('Comment not found!', 404)); 

    if(note.notes_by !== staffId) return next(createError('Unauthorized action!', 403)); 

    return res.status(200).json({
        success: true,
        message: "Note found!",
        data: note
    });
});

export const updateTaskComment = asyncHandler(async (req, res, next) => {
    const { id: staffId } = req.user; 
    const { taskId, id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(taskId)) return next(createError('Invalid task id!', 400)); 
    if(!mongoose.Types.ObjectId.isValid(id)) return next(createError('Invalid comment id!', 400));  

    const updateComment = await TaskComment.findOne({ 
        _id: new mongoose.Types.ObjectId(id),
        task: new mongoose.Types.ObjectId(taskId)
    });

    if(!updateComment) return next(createError('Comment not found!', 404)); 

    if(updateComment.comment_by.toString() !== staffId) return next(createError('Unauthorized action!', 403)); 

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
    const { id: staffId } = req.user; 
    const { taskId, id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(taskId)) return next(createError('Invalid task id!', 400)); 
    if(!mongoose.Types.ObjectId.isValid(id)) return next(createError('Invalid comment id!', 400)); 

    const comment = await TaskComment.findOne({ 
        task: new mongoose.Types.ObjectId(taskId),
        _id: new mongoose.Types.ObjectId(id)
    });

    if(!comment) return next(createError('Comment not found!', 404)); 

    if(updateComment.comment_by.toString() !== staffId) return next(createError('Unauthorized action!', 403));

    await comment.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Comment deleted successfully!"
    });
});
