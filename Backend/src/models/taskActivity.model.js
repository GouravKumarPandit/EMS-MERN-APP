import mongoose from "mongoose";

const TaskActivitySchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    task_type: {
        type: String,
        enum: [
            "created",
            "updated",
            "status_changed",
            "priority_changed",
            "due_date_changed",
            "assigned",
            "deleted"
        ],
        required: true
    },
    old_value: {
        type: String,
        trim: true,
    },
    new_value: {
        type: String,
        trim: true,
    },
    task_activity: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    updated_by_name: {
        type: String,
        required: false
    }
}, { timestamps: true });

TaskActivitySchema.index({
    task: 1,
    createdAt: -1,
});

export const TaskActivity = mongoose.model(
    "TaskActivity",
    TaskActivitySchema
);