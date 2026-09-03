import { body } from "express-validator";

export const createNoteValidation = [
    body("notes")
        .trim()
        .notEmpty()
        .withMessage("Note title is required!")
        .isLength({ max: 500 })
        .withMessage("Note title must be maximum 500 characters long."),

    body("notes_description")
        .trim()
        .notEmpty()
        .withMessage("Note description is required!")
        .isLength({ max: 5000 })
        .withMessage("Note description must be maximum 5000 characters long."),

    body("color")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ max: 30 })
        .withMessage("Color is invalid."),
];

export const updateNoteValidation = [
    body("notes")
        .trim()
        .notEmpty()
        .withMessage("Note title is required!")
        .isLength({ max: 500 })
        .withMessage("Note title must be maximum 500 characters long."),

    body("notes_description")
        .trim()
        .notEmpty()
        .withMessage("Note description is required!")
        .isLength({ max: 5000 })
        .withMessage("Note description must be maximum 5000 characters long."),
];
