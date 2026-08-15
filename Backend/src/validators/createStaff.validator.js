import { body } from "express-validator";

const createStaffValidation = [
    body("first_name")
        .trim()
        .notEmpty()
        .withMessage("First name is required!")
        .isLength({ max: 15 })
        .withMessage("First name must not exceed 15 characters."),

    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("Last name is required!")
        .isLength({ max: 15 })
        .withMessage("Last name must not exceed 15 characters."),

    body("username")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Username is required!")
        .isLength({ min: 5, max: 15 })
        .withMessage("Username must be 5 to 15 characters long.")
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage("Username can contain only letters and numbers."),

    body("email")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Email is required!")
        .isLength({ min: 5, max: 50 })
        .withMessage("Email must be 5 to 50 characters long.")
        .isEmail()
        .withMessage('Email is not a valid email.'),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 15 })
        .withMessage("Password must be 6 to 15 characters long."),

    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("Phone Number is required")
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile number must be 10 to 10 digit long."),

    body("gender")
        .optional()
        .trim()
        .toLowerCase()
        .isIn(["male", "female", "others"])
        .withMessage("Gender must be either 'male' or 'female' or 'others'."),
    
    body("dob")
        .optional()
        .isDate()
        .withMessage("Date of birth must be a valid date."),

    body("role")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["admin", "staff"])
        .withMessage("Role must be either 'admin' or 'staff'."),
];

export default createStaffValidation;