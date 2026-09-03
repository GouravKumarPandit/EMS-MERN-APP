import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import { Note } from "../models/notes.model.js";
import createError from "../utils/createError.js";
import { escapeRegex, idsEqual } from "../utils/helper.js";

export const getAllNotes = asyncHandler(async (req, res) => {
    const { id: staffId } = req.user;
    const { search } = req.query;
    const query = {
        notes_by: new mongoose.Types.ObjectId(staffId)
    };

    if (search) {
        const safeSearch = escapeRegex(search);
        query.$or = [
            { notes: { $regex: safeSearch, $options: "i" } },
            { notes_description: { $regex: safeSearch, $options: "i" } },
            { notes_id: { $regex: safeSearch, $options: "i" } },
        ]
    }

    const notes = await Note.find(query).lean();

    return res.status(200).json({
        success: true,
        data: notes
    });
});

export const createNotes = asyncHandler(async (req, res) => {
    const { id: staffId } = req.user;
    const { notes, notes_description, color } = req.body;
    const notes_id = Date.now();

    const note = new Note({
        notes,
        notes_description,
        notes_id,
        color,
        notes_by: new mongoose.Types.ObjectId(staffId)
    });
    await note.save();

    return res.status(201).json({
        success: true,
        message: "Note created successfully!",
        data: note
    });
});

export const getNoteById = asyncHandler(async (req, res, next) => {
    const { id: staffId } = req.user;
    const noteId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(noteId)) return next(createError("Invalid note id!", 400));

    const note = await Note.findById(noteId).lean();

    if (!note) return next(createError("Note not found!", 404));
    if (!idsEqual(note.notes_by, staffId)) return next(createError("Unauthorized action!", 403));

    return res.status(200).json({
        success: true,
        message: "Note found!",
        data: note
    });
});

export const updateNote = asyncHandler(async (req, res, next) => {
    const { id: staffId } = req.user;
    const noteId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(noteId)) return next(createError("Invalid note id!", 400));

    const note = await Note.findById(noteId);

    if (!note) return next(createError("Note not found!", 404));
    if (!idsEqual(note.notes_by, staffId)) return next(createError("Unauthorized action!", 403));

    const { notes, notes_description } = req.body;
    note.notes = notes;
    note.notes_description = notes_description;
    await note.save();

    return res.status(200).json({
        success: true,
        message: "Note updated successfully!",
        data: note
    });
});

export const deleteNote = asyncHandler(async (req, res, next) => {
    const { id: staffId } = req.user;
    const noteId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(noteId)) return next(createError("Invalid note id!", 400));

    const note = await Note.findById(noteId);

    if (!note) return next(createError("Note not found!", 404));
    if (!idsEqual(note.notes_by, staffId)) return next(createError("Unauthorized action!", 403));

    await note.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Note deleted successfully!"
    });
});
