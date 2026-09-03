import { body } from "express-validator";

const changePasswordValidation = [
    body("currentPassword")
        .trim()
        .notEmpty()
        .withMessage("Current password is required!"),

    body("newPassword")
        .trim()
        .notEmpty()
        .withMessage("New password is required!")
        .isLength({ min: 8, max: 72 })
        .withMessage("New password must be 8 to 72 characters long."),

    body("confirmPassword")
        .trim()
        .notEmpty()
        .withMessage("Confirm password is required!")
        .custom((value, { req }) => value === req.body.newPassword)
        .withMessage("New password and confirm password do not match!"),
];

export default changePasswordValidation;
