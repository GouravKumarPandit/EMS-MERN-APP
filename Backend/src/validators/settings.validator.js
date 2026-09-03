import { body } from "express-validator";

const settingsValidation = [
    body("company_name")
        .trim()
        .notEmpty()
        .withMessage("Company name is required!")
        .isLength({ max: 100 })
        .withMessage("Company name must be maximum 100 characters long."),

    body("company_email")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Company email is required!")
        .isEmail()
        .withMessage("Company email is not a valid email.")
        .isLength({ min: 6, max: 50 })
        .withMessage("Company email must be 6 to 50 characters long."),

    body("company_phone")
        .trim()
        .notEmpty()
        .withMessage("Company phone is required!")
        .isLength({ min: 10, max: 15 })
        .withMessage("Company phone must be 10 to 15 characters long."),

    body("privacy_policy")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ max: 20000 })
        .withMessage("Privacy policy must be maximum 20000 characters long."),

    body("terms_of_service")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ max: 20000 })
        .withMessage("Terms of service must be maximum 20000 characters long."),
];

export default settingsValidation;
