import { body } from "express-validator";

const createTaskValidation = [
    body("task")
        .trim()
        .notEmpty()
        .withMessage("Task is required!")
        .isLength({ max: 100 })
        .withMessage("Task must be maximum 100 characters long."),

    body("task_description")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ max: 500 })
        .withMessage("Task description must be maximum 500 characters long."),

    body("priority")
        .optional({ values: "falsy" })
        .trim()
        .isIn(["high", "medium", "low", "urgent"])
        .withMessage("Priority must be either 'high', 'medium', 'low', or 'urgent'."),

    body("status")
        .optional({ values: "falsy" })
        .trim()
        .isIn(["pending", "accepted", "completed", "failed"])
        .withMessage("Status must be either 'pending' or 'accepted' or 'completed' or 'failed'."),

    body("status_description")
        .optional({ values: "falsy" })
        .trim(),

    body("due_date")
        .optional({ values: "falsy" })
        .trim()
        .isISO8601({ strict: true })
        .withMessage("Due date must be a valid date"),

    body("assigned_staff")
        .optional({ values: "falsy" })
        .trim()
        .isMongoId()
        .withMessage("Assigned staff must be a valid id."),
];

export default createTaskValidation; 