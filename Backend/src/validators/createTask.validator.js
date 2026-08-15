import { body } from "express-validator";

const createTaskValidation = [
    body("task")
        .trim()
        .notEmpty()
        .withMessage("Task is required!")
        .isLength({ max: 100 })
        .withMessage("Task must be maximum 100 characters long."),

    body("task_description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Task description must be maximum 500 characters long."),

    body("priority")
        .optional()
        .trim()
        .isIn(["high", "medium", "low"])
        .withMessage("Priority must be either 'high' or 'medium' or 'low'."),

    body("status")
        .optional()
        .trim()
        .isIn(["pending", "accepted", "completed", "failed"])
        .withMessage("Status must be either 'pending' or 'accepted' or 'completed' or 'failed'."),

    body("status_description")
        .optional()
        .trim(),

    body("due_date")
        .optional()
        .trim()
        .isDate()
        .withMessage("Due date must be date"),

    body("assigned_staff")
        .optional()
        .trim(),
];

export default createTaskValidation; 