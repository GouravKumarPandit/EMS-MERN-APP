import mongoose, { mongo, Types } from "mongoose";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import { Task } from "../models/task.model.js";
import { TaskActivity } from "../models/taskActivity.model.js";

export const dashboard = asyncHandler(async (req, res, next) => {
    const { role, id: staffId } = req.user;

    const taskCount = await Task.aggregate([
        {
            $match: { assigned_staff: staffId }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    const taskStats = {
        pending: 0,
        accepted: 0,
        completed: 0,
        failed: 0
    };

    taskCount.forEach((item) => {
        if (item._id in taskStats) {
            taskStats[item._id] = item.count;
        }
    });

    const recentTasks = await Task.find({ assigned_staff: staffId })
        .sort({ due_date: 1 })
        .limit(5)
        .populate("assigned_staff", "first_name last_name")
        .lean();

    let staffTaskStats = {};
    if(role === "admin"){
        const staffTaskStats = await Task.aggregate([{
                $group: {
                    _id: {
                        staff: "$assigned_staff",
                        status: "$status"
                    },
                    count: {
                        $sum: 1
                    }
                }
            },

            {
                $group: {
                    _id: "$_id.staff",

                    pending: {
                        $sum: {
                            $cond: [
                                { $eq: ["$_id.status", "pending"] },
                                "$count",
                                0
                            ]
                        }
                    },

                    accepted: {
                        $sum: {
                            $cond: [
                                { $eq: ["$_id.status", "accepted"] },
                                "$count",
                                0
                            ]
                        }
                    },

                    completed: {
                        $sum: {
                            $cond: [
                                { $eq: ["$_id.status", "completed"] },
                                "$count",
                                0
                            ]
                        }
                    },

                    failed: {
                        $sum: {
                            $cond: [
                                { $eq: ["$_id.status", "failed"] },
                                "$count",
                                0
                            ]
                        }
                    }
                }
            },

            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "staff"
                }
            },

            {
                $unwind: "$staff"
            },

            {
                $project: {
                    _id: 0,

                    staff_id: "$_id",

                    first_name: "$staff.first_name",
                    last_name: "$staff.last_name",
                    username: "$staff.username",
                    email: "$staff.email",

                    pending: 1,
                    accepted: 1,
                    completed: 1,
                    failed: 1
                }
            }
        ]);
    } else {
        const staffTasksCount = []
    }

    return res.status(200).json({
        success: true,
        data: {
            loggedInStaffTask: {
                taskCount: taskStats,
                recentTasks
            },
            staffTaskCount: staffTaskStats
        }
    });
});

export const getAllStaff = asyncHandler(async (req, res, next) => {
    const staffs = await User.find().lean();

    return res.status(200).json({
        success: true,
        data: staffs
    });
});

export const createStaff = asyncHandler(async (req, res, next) => {
    const { first_name, last_name, username, email, dialcode, phone_number, password, gender, dob, role } = req.body;
    const emailOrUsernameExists = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    }).lean();

    if(emailOrUsernameExists){
        return next(createError("Email or Username already exists!", 409));
    }

    const staff = new User({first_name, last_name, username, email, dialcode, phone_number, password, gender, dob, role});
    await staff.save();

    return res.status(201).json({
        success: true,
        message: "Staff created successfully!",
        data: staff
    });

});

export const getStaffById = asyncHandler(async (req, res, next) => {
    const staffId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(staffId)) return next(createError('Invalid staff id', 400));

    const staff = await User.findById(staffId).select("-password").lean();
    if(!staff) return next(createError('Staff not found', 404));

    const taskCount = await Task.aggregate([
        {
            $match: { assigned_staff: staffId }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    const taskStats = {
        pending: 0,
        accepted: 0,
        completed: 0,
        failed: 0
    };

    taskCount.forEach((item) => {
        if (item._id in taskStats) {
            taskStats[item._id] = item.count;
        }
    });

    return res.status(200).json({
        success: true,
        message: "Staff found!",
        data: {
            staff,
            taskStats
        }
    });
});

export const updateStaff = asyncHandler(async (req, res, next) => {
    const staffId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(staffId)) return next(createError("Invalid staff id!", 400));
    
    const staffExists = await User.findById(staffId).lean();
    if(!staffExists) return next(createError("Staff not found!", 404));

    const { first_name, last_name, email, dialcode, phone_number, gender, dob, role } = req.body;

    const emailExists = await User.findOne({
        email: email,
        _id: { $ne: staffId }
    }).lean();
    if(emailExists) return next(createError("Email already exists!", 409));
    

    const staff = await User.findByIdAndUpdate(
        staffId, 
        { first_name, last_name, email, dialcode, phone_number, gender, dob, role },
        { 
            new: true,
            runValidators: true 
        }
    );

    return res.status(200).json({
        success: true,
        message: "Staff updated successfully!",
        data: staff
    });

});

export const deleteStaff = asyncHandler(async (req, res, next) => {
    const staffId = req.params.id; 
    if(!mongoose.Types.ObjectId.isValid(staffId)) return next(createError("Invalid staff id!", 400));

    const staff = await User.findById(staffId);
    if(!staff) return next(createError("Staff not found!", 404));

    //Uninitialize all the task of the deleted staff. 
    const tasks = await Task.updateMany(
        {
            assigned_staff: staff._id
        },
        {
            $unset: {
                assigned_staff: 1
            }
        }
    );

    await staff.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Staff deleted successfully!"
    });
});

export const changePassword = asyncHandler(async (req, res, next) => {
    const staffId = req.params.id; 
    if(!mongoose.Types.ObjectId.isValid(staffId)) return next(createError("Invalid staff id!", 400));

    if(req.user.id.toString() !== staffId) return next(createError("Unauthorized action!", 403));
    
    const staff = await User.findById(staffId);
    if(!staff) return next(createError("Staff not found!", 404));

    const { currentPassword, newPassword, confirmPassword } = req.body;

    const isMatch = await bcrypt.compare(currentPassword, staff.password);
    if(!isMatch) return next(createError("Current password is incorrect!!", 400));

    const isSamePassword = await bcrypt.compare(newPassword, staff.password);
    if (isSamePassword)  return next(createError("New password must be different from your current password!", 400));

    if(newPassword.trim() !== confirmPassword.trim()) return next(createError("You new password and confirm password not matching!", 400));

    staff.password = newPassword;
    await staff.save();

    return res.status(200).json({
        success: true,
        message: "Password changed successfully!"
    });
});
