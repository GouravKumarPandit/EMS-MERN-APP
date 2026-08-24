import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
            maxlength: 100,
            trim: true,
        },
        task_id: {
            type: String,
            required: true,
            trim: true
        },
        task_description: {
            type: String,
            maxlength: 500,
            trim: true,
        },
        priority: {
            type: String,
            enum: ["high", "medium", "low"],
            default: "low"
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "completed", "failed"],
            default: "pending"
        },
        status_description: {
            type: String,
            trim: true,
        },
        due_date: {
            type: Date,
        },
        assigned_staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

taskSchema.index({ assigned_staff: 1 });

export const Task = mongoose.model("Task", taskSchema);