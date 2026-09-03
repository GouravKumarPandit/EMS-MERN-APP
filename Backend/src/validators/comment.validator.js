import { body } from "express-validator";

const commentValidation = [
    body("comment")
        .trim()
        .notEmpty()
        .withMessage("Comment is required!")
        .isLength({ max: 500 })
        .withMessage("Comment must be maximum 500 characters long."),
];

export default commentValidation;
