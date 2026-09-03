import mongoose from "mongoose";
import { Task } from "../models/task.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import createError from "../utils/createError.js";
import { TaskActivity } from "../models/taskActivity.model.js";
import { canAccessTask, escapeRegex, getUserFullNameById, parsePagination } from "../utils/helper.js";
import { TaskComment } from "../models/taskComment.model.js";

export const getAllTask = asyncHandler(async (req, res) => {
    const { role, id: staffId } = req.user;
    const { search, status, priority, staff } = req.query;
    const { page, limit, skip } = parsePagination(req.query);

    const query = {};
    if (search) {
        const safeSearch = escapeRegex(search);
        query.$or = [
            { task: { $regex: safeSearch, $options: "i" } },
            { task_description: { $regex: safeSearch, $options: "i" } },
            { task_id: { $regex: safeSearch, $options: "i" } },
        ]
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (staff && mongoose.Types.ObjectId.isValid(staff)) {
        query.assigned_staff = new mongoose.Types.ObjectId(staff);
    }
    if (role !== "admin") query.assigned_staff = new mongoose.Types.ObjectId(staffId);

    const [tasks, totalTasks] = await Promise.all([
        Task.find(query)
            .populate("assigned_staff", "first_name last_name email username")
            .skip(skip)
            .limit(limit)
            .lean(),

        Task.countDocuments(query),
    ]);
    const totalPages = Math.ceil(totalTasks / limit);

    return res.status(200).json({
        success: true,
        data: {
            tasks,
            pagination: {
                currentPage: page,
                limit,
                totalRecords: totalTasks,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        }
    });
});

export const createTask = asyncHandler(async (req, res) => {
    const { task, task_description, priority, status, status_description, due_date, assigned_staff } = req.body;
    const task_id = Date.now();

    const createTask = new Task({
        task,
        task_id,
        task_description,
        priority: priority ? priority : "low",
        status: status ? status : "pending",
        status_description,
        due_date: due_date ? due_date : null,
        assigned_staff: assigned_staff ? assigned_staff : null
    });
    await createTask.save();

    const createdBy = await getUserFullNameById(req.user.id);
    const activities = [
        {
            task: createTask._id,
            task_type: "created",
            task_activity: "Task created.",
            updated_by: req.user.id,
            updated_by_name: `${createdBy}`
        }
    ];
    if (assigned_staff) {
        const assignedStaff = await getUserFullNameById(assigned_staff);
        activities.push({
            task: createTask._id,
            task_type: "assigned",
            task_activity: `Task assigned to ${assignedStaff}.`,
            updated_by: req.user.id,
            updated_by_name: `${createdBy}`
        });
    }

    await TaskActivity.insertMany(activities);

    return res.status(201).json({
        success: true,
        message: "Task created successfully!",
        data: createTask
    });
});

export const getTaskById = asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) return next(createError("Invalid task id!", 400));

    const task = await Task.findById(taskId).populate("assigned_staff", "first_name last_name email username").lean();

    if (!task) return next(createError("Task not found!", 404));
    if (!canAccessTask(req.user, task)) return next(createError("Unauthorized action!", 403));

    return res.status(200).json({
        success: true,
        message: "Task found!",
        data: task
    });
});

export const getTaskActivities = asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) return next(createError("Invalid task id!", 400));

    const task = await Task.findById(taskId).select("_id assigned_staff").lean();
    if (!task) return next(createError("Task not found!", 404));
    if (!canAccessTask(req.user, task)) return next(createError("Unauthorized action!", 403));

    const allowedTypes = [
        "created",
        "updated",
        "status_changed",
        "priority_changed",
        "due_date_changed",
        "assigned",
        "deleted"
    ];

    const query = { task: taskId };
    const { type } = req.query;
    if (type) {
        if (!allowedTypes.includes(type)) {
            return next(createError("Invalid activity type!", 400));
        }
        query.task_type = type;
    }

    const activities = await TaskActivity.find(query)
        .populate("updated_by", "first_name last_name")
        .sort({ createdAt: -1 })
        .lean();

    return res.status(200).json({
        success: true,
        data: activities
    });
});

export const updateTask = asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) return next(createError("Invalid task id!", 400));

    const { role } = req.user;
    const { task, task_description, priority, status, status_description, due_date, assigned_staff } = req.body;
    const task_id = Date.now();

    const updateTask = await Task.findById(taskId);
    if (!updateTask) return next(createError("Task not found!", 404));
    if (!canAccessTask(req.user, updateTask)) return next(createError("Unauthorized action!", 403));

    if (role !== "admin") {
        if (assigned_staff && assigned_staff.toString() !== updateTask?.assigned_staff?.toString()) {
            return next(createError("Staff cannot reassign tasks!", 403));
        }
    }

    const loggedInUser = await getUserFullNameById(req.user.id);
    const activities = [{
        task: updateTask._id,
        task_type: "updated",
        task_activity: "Task updated.",
        updated_by: req.user.id,
        updated_by_name: `${loggedInUser}`
    }];
    if (assigned_staff && updateTask?.assigned_staff?.toString() !== assigned_staff.toString()) {
        const assignedStaff = await getUserFullNameById(assigned_staff);
        activities.push({
            task: updateTask._id,
            task_type: "assigned",
            task_activity: `Task assigned to ${assignedStaff}.`,
            old_value: updateTask.assigned_staff,
            new_value: assigned_staff,
            updated_by: req.user.id,
            updated_by_name: `${loggedInUser}`
        });
    }
    if (updateTask?.priority !== priority) {
        activities.push({
            task: updateTask._id,
            task_type: "priority_changed",
            task_activity: `Task priority changed from ${updateTask.priority} to ${priority}.`,
            old_value: updateTask.priority,
            new_value: priority,
            updated_by: req.user.id,
            updated_by_name: `${loggedInUser}`
        });
    }
    if (updateTask?.status !== status) {
        activities.push({
            task: updateTask._id,
            task_type: "status_changed",
            task_activity: `Task status changed from ${updateTask.status} to ${status}.`,
            old_value: updateTask.status,
            new_value: status,
            updated_by: req.user.id,
            updated_by_name: `${loggedInUser}`
        });
    }

    const oldDueDate = updateTask?.due_date
        ? new Date(updateTask.due_date).getTime()
        : null;

    const newDueDate = due_date
        ? new Date(due_date).getTime()
        : null;
    if (oldDueDate !== newDueDate) {
        activities.push({
            task: updateTask._id,
            task_type: "due_date_changed",
            task_activity: `Task due date changed to ${due_date}.`,
            new_value: due_date,
            updated_by: req.user.id,
            updated_by_name: `${loggedInUser}`
        });
    }

    updateTask.task = task;
    updateTask.task_id = updateTask.task_id ? updateTask.task_id : task_id;
    updateTask.task_description = task_description;
    updateTask.priority = priority;
    updateTask.status = status;
    updateTask.status_description = status_description ? status_description : null;
    updateTask.due_date = due_date ? due_date : null;
    if (role === "admin") {
        updateTask.assigned_staff = assigned_staff ? assigned_staff : null;
    }
    await updateTask.save();

    await TaskActivity.insertMany(activities);

    return res.status(200).json({
        success: true,
        message: "Task updated successfully!",
        data: updateTask
    });
});

export const changeStatus = asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) return next(createError("Invalid task id!", 400));

    const { status, status_description } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return next(createError("Task not found!", 404));
    if (!canAccessTask(req.user, task)) return next(createError("Unauthorized action!", 403));

    const activities = [];
    const loggedInUser = await getUserFullNameById(req.user.id);
    if (task.status !== status) {
        activities.push({
            task: task._id,
            task_type: "status_changed",
            task_activity: `Task status changed from ${task.status} to ${status}.`,
            old_value: task.status,
            new_value: status,
            updated_by: req.user.id,
            updated_by_name: `${loggedInUser}`
        });
    }

    task.status = status;
    task.status_description = status_description;
    await task.save();

    if (activities.length) {
        await TaskActivity.insertMany(activities);
    }

    return res.status(200).json({
        success: true,
        message: "Task updated successfully!",
        data: task
    });
});

export const deleteTask = asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) return next(createError("Invalid task id!", 400));

    const task = await Task.findById(taskId);
    if (!task) return next(createError("Task not found!", 404));
    if (!canAccessTask(req.user, task)) return next(createError("Unauthorized action!", 403));

    const loggedInUser = await getUserFullNameById(req.user.id);
    await TaskActivity.create({
        task: task._id,
        task_type: "deleted",
        task_activity: "Task deleted.",
        updated_by: req.user.id,
        updated_by_name: `${loggedInUser}`
    });

    await TaskComment.deleteMany({
        task: new mongoose.Types.ObjectId(taskId)
    });

    await task.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Task deleted successfully!"
    });
});
