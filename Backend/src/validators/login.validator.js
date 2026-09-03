import { body } from "express-validator";

const loginValidation = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .matches(/^\S+$/)
        .withMessage('Username must not contain spaces')
        .isLength({ min: 5, max: 15 })
        .withMessage("Username must be 5 to 15 characters long."),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required!")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long."),
];

export default loginValidation;