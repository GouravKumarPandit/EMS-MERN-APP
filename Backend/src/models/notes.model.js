import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    notes: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true
    },
    notes_description: {
        type: String,
        required: true,
        maxlength: 5000,
        trim: true
    },
    notes_id: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        default: "yellow",
    },
    notes_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

export const Note = mongoose.model("Note", notesSchema);