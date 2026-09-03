import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import { Task } from "../models/task.model.js";
import { escapeRegex, parsePagination } from "../utils/helper.js";

export const dashboard = asyncHandler(async (req, res) => {
    const { role, id: staffId } = req.user;

    const taskCount = await Task.aggregate([
        {
            $match: { assigned_staff: new mongoose.Types.ObjectId(staffId) }
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

    const recentTasks = await Task.find({
            assigned_staff: new mongoose.Types.ObjectId(staffId),
            status: {
                $ne: "completed"
            }
        })
        .sort({ due_date: 1 })
        .limit(20)
        .populate("assigned_staff", "first_name last_name")
        .lean();

    let staffTaskStats = [];
    if (role === "admin") {
        staffTaskStats = await User.aggregate([
            {
                $match: {
                    role: "staff"
                }
            },
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "assigned_staff",
                    as: "tasks"
                }
            },
            {
                $project: {
                    first_name: 1,
                    last_name: 1,
                    username: 1,
                    email: 1,
                    pending: {
                        $size: {
                            $filter: {
                                input: "$tasks",
                                as: "task",
                                cond: {
                                    $eq: ["$$task.status", "pending"]
                                }
                            }
                        }
                    },
                    accepted: {
                        $size: {
                            $filter: {
                                input: "$tasks",
                                as: "task",
                                cond: {
                                    $eq: ["$$task.status", "accepted"]
                                }
                            }
                        }
                    },
                    completed: {
                        $size: {
                            $filter: {
                                input: "$tasks",
                                as: "task",
                                cond: {
                                    $eq: ["$$task.status", "completed"]
                                }
                            }
                        }
                    },
                    failed: {
                        $size: {
                            $filter: {
                                input: "$tasks",
                                as: "task",
                                cond: {
                                    $eq: ["$$task.status", "failed"]
                                }
                            }
                        }
                    }
                }
            }
        ]);
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

export const getAllStaff = asyncHandler(async (req, res) => {
    const { search, role, gender } = req.query;
    const { page, limit, skip } = parsePagination(req.query);

    const query = {};
    if (search) {
        const safeSearch = escapeRegex(search);
        query.$or = [
            { first_name: { $regex: safeSearch, $options: "i" } },
            { last_name: { $regex: safeSearch, $options: "i" } },
            { email: { $regex: safeSearch, $options: "i" } },
            { username: { $regex: safeSearch, $options: "i" } }
        ];
    }

    if (role) {
        query.role = role;
    }

    if (gender) {
        query.gender = gender;
    }

    const [staffs, totalStaff] = await Promise.all([
        User.find(query).select("-password").skip(skip).limit(limit).lean(),
        User.countDocuments(query),
    ]);
    const totalPages = Math.ceil(totalStaff / limit);

    return res.status(200).json({
        success: true,
        data: {
            staffs,
            pagination: {
                currentPage: page,
                limit,
                totalRecords: totalStaff,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        }
    });
});

export const createStaff = asyncHandler(async (req, res, next) => {
    const { first_name, last_name, username, email, dialcode, phone_number, password, gender, dob, role } = req.body;
    const emailOrUsernameExists = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("_id").lean();

    if (emailOrUsernameExists) {
        return next(createError("Email or Username already exists!", 409));
    }

    const staff = new User({ first_name, last_name, username, email, dialcode, phone_number, password, gender, dob, role });
    await staff.save();

    return res.status(201).json({
        success: true,
        message: "Staff created successfully!",
        data: staff
    });
});

export const getStaffById = asyncHandler(async (req, res, next) => {
    const staffId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(staffId)) return next(createError("Invalid staff id", 400));

    const staff = await User.findById(staffId).select("-password").lean();
    if (!staff) return next(createError("Staff not found", 404));

    const taskCount = await Task.aggregate([
        {
            $match: { assigned_staff: new mongoose.Types.ObjectId(staffId) }
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
    if (!mongoose.Types.ObjectId.isValid(staffId)) return next(createError("Invalid staff id!", 400));

    const staffExists = await User.findById(staffId).select("_id").lean();
    if (!staffExists) return next(createError("Staff not found!", 404));

    const { first_name, last_name, email, dialcode, phone_number, gender, dob, role } = req.body;

    const emailExists = await User.findOne({
        email: email,
        _id: { $ne: staffId }
    }).select("_id").lean();
    if (emailExists) return next(createError("Email already exists!", 409));

    const staff = await User.findByIdAndUpdate(
        staffId,
        { first_name, last_name, email, dialcode, phone_number, gender, dob, role },
        {
            new: true,
            runValidators: true
        }
    ).select("-password");

    return res.status(200).json({
        success: true,
        message: "Staff updated successfully!",
        data: staff
    });
});

export const deleteStaff = asyncHandler(async (req, res, next) => {
    const staffId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(staffId)) return next(createError("Invalid staff id!", 400));

    const staff = await User.findById(staffId);
    if (!staff) return next(createError("Staff not found!", 404));

    if (staff._id.toString() === req.user.id.toString()) {
        return next(createError("You cannot delete your own account!", 400));
    }

    await Task.updateMany(
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
    if (!mongoose.Types.ObjectId.isValid(staffId)) return next(createError("Invalid staff id!", 400));

    if (req.user.id.toString() !== staffId) return next(createError("Unauthorized action!", 403));

    const staff = await User.findById(staffId);
    if (!staff) return next(createError("Staff not found!", 404));

    const { currentPassword, newPassword, confirmPassword } = req.body;

    const isMatch = await bcrypt.compare(currentPassword, staff.password);
    if (!isMatch) return next(createError("Current password is incorrect!", 400));

    const isSamePassword = await bcrypt.compare(newPassword, staff.password);
    if (isSamePassword) return next(createError("New password must be different from your current password!", 400));

    if (newPassword.trim() !== confirmPassword.trim()) return next(createError("Your new password and confirm password do not match!", 400));

    staff.password = newPassword;
    await staff.save();

    return res.status(200).json({
        success: true,
        message: "Password changed successfully!"
    });
});

export const getFilterAllStaff = asyncHandler(async (req, res) => {
    const staffs = await User.find().select("first_name last_name").lean();

    return res.status(200).json({
        success: true,
        data: staffs
    });
});
