import express from "express";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js";
import { getAllNotes, createNotes, getNoteById, updateNote, deleteNote } from "../controllers/note.controller.js";
import { createNoteValidation, updateNoteValidation } from "../validators/note.validator.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

router.get("/", isLoggedIn, getAllNotes);
router.post("/", isLoggedIn, createNoteValidation, validate, createNotes);
router.get("/:id", isLoggedIn, getNoteById);
router.put("/:id", isLoggedIn, updateNoteValidation, validate, updateNote);
router.delete("/:id", isLoggedIn, deleteNote);

export default router;
