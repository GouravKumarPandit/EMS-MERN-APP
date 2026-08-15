import mongoose from "mongoose";
import { Task } from "../models/task.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import createError from "../utils/createError.js";

export const getAllTask = asyncHandler(async (req, res, next) => {
    const { role, id: staffId } = req.user;

    const filter = role === "admin" ? {} : { assigned_staff: staffId };

    const tasks = await Task.find(filter).populate("assigned_staff", "first_name last_name email username").lean();

    return res.status(200).json({
        success: true,
        data: tasks
    });
});

export const createTask = asyncHandler(async (req, res, next) => {
    const { task, task_description, priority, status, status_description, due_date, assigned_staff } = req.body; 

    const createTask = new Task({
        task, task_description, priority, status, status_description, due_date, assigned_staff
    });
    await createTask.save();

    return res.status(201).json({
        success: true,
        message: "Task created successfully!",
        data: createTask
    });
});

export const getTaskById = asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(taskId)) return next(createError('Invalid task id!', 400)); 

    const task = await Task.findById(taskId).lean();

    if(!task) return next(createError('Task not found!', 404)); 

    return res.status(200).json({
        success: true,
        message: "Task found!",
        data: task
    });
});

export const updateTask = asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(taskId)) return next(createError('Invalid task id!', 400)); 

    const { role, id: staffId } = req.user;
    const { task, task_description, priority, status, status_description, due_date, assigned_staff } = req.body; 

    const updateTask = await Task.findById(taskId);
    if(!updateTask) return next(createError("Task not found!", 404));

    if(role !== "admin" && staffId.toString() !== updateTask.assigned_staff.toString()) return next(createError('Unauthorized action!', 403)); 

    updateTask.task = task;
    updateTask.task_description = task_description;
    updateTask.priority = priority;
    updateTask.status = status;
    updateTask.status_description = status_description;
    updateTask.due_date = due_date;
    updateTask.assigned_staff = assigned_staff;
    await updateTask.save();

    return res.status(200).json({
        success: true,
        message: "Task updated successfully!",
        data: updateTask
    });
});

export const changeStatus = asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(taskId)) return next(createError('Invalid task id!', 400)); 

    const { role, id: staffId } = req.user;
    const { priority, status, status_description, due_date } = req.body; 

    const task = await Task.findById(taskId);
    if(!task) return next(createError("Task not found!", 404));

    if(role !== "admin" && staffId.toString() !== task.assigned_staff.toString()) return next(createError('Unauthorized action!', 403)); 

    task.priority = priority;
    task.status = status;
    task.status_description = status_description;
    task.due_date = due_date;
    await task.save();

    return res.status(200).json({
        success: true,
        message: "Task updated successfully!",
        data: task
    });
});

export const deleteTask = asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(taskId)) return next(createError('Invalid task id!', 400)); 

    const { role, id: staffId } = req.user;

    const task = await Task.findById(taskId);
    if(!task) return next(createError("Task not found!", 404));

    if(role !== "admin" && staffId.toString() !== task.assigned_staff) return next(createError('Unauthorized action!', 403)); 

    await task.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Task deleted successfully!"
    });
});
