import express from "express";
import isLoggedIn from "../middleware/isLoggedin.middleware.js";
import { getAllNotes, createNotes, getNoteById, updateNote, deleteNote } from "../controllers/note.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getAllNotes);
router.post("/", isLoggedIn, createNotes);
router.get("/:id", isLoggedIn, getNoteById);
router.put("/:id", isLoggedIn, updateNote);
router.delete("/:id", isLoggedIn, deleteNote);

export default router;