import mongoose from "mongoose";

const taskCommentSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    comment: {
        type: String,
        maxlength: 500,
        required: true,
        trim: true
    },
    comment_id: {
        type: String,
        required: true
    },
    comment_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export const TaskComment = mongoose.model("TaskComment", taskCommentSchema);