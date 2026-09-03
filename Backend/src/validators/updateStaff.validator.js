import { body } from "express-validator";

const updateStaffValidation = [
    body("first_name")
        .trim()
        .notEmpty()
        .withMessage("First name is required.")
        .matches(/^[A-Za-z ]+$/)
        .withMessage("First name can contain only letters and spaces")
        .isLength({ max: 15 })
        .withMessage("First name must not exceed 15 characters."),

    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("Last name is required.")
        .matches(/^[A-Za-z ]+$/)
        .withMessage("Last name can contain only letters and spaces")
        .isLength({ max: 15 })
        .withMessage("Last name must not exceed 15 characters."),

    body("email")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Email is required.")
        .isLength({ min: 5, max: 50 })
        .withMessage("Email must be 5 to 50 characters long.")
        .isEmail()
        .withMessage("Email is not a valid email."),

    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required.")
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile number must be exactly 10 digits long.")
        .matches(/^\d{10}$/)
        .withMessage("Mobile number must contain only digits."),

    body("gender")
        .optional()
        .trim()
        .toLowerCase()
        .isIn(["male", "female", "others"])
        .withMessage("Gender must be either 'male', 'female', or 'others'."),

    body("dob")
        .optional()
        .isISO8601({ strict: true })
        .withMessage("Date of birth must be a valid date."),

    body("role")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Role is required.")
        .isIn(["admin", "staff"])
        .withMessage("Role must be either 'admin' or 'staff'."),
];

export default updateStaffValidation;