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
    
    body("priority")
        .optional()
        .trim()
        .isIn(["high", "medium", "low"])
        .withMessage("Priority must be either 'high' or 'medium' or 'low'."),

    body("due_date")
        .optional()
        .trim()
        .isDate()
        .withMessage("Due date must be date"),
];

export default changeTaskStatusValidation; 