import { body } from "express-validator";

const changeTaskStatusValidation = [
    body("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required!")
        .isIn(["pending", "accepted", "completed", "failed"])
        .withMessage("Status must be either 'pending' or 'accepted' or 'completed' or 'failed'."),
    
    body("status_description")
        .optional()
        .trim(),
];

export default changeTaskStatusValidation; 