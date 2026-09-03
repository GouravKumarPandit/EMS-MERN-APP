import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRoute from "./routes/auth.routes.js";
import staffRoute from "./routes/user.routes.js";
import taskRoute from "./routes/task.routes.js";
import taskCommentRoute from "./routes/taskComment.routes.js";
import notesRoute from "./routes/note.routes.js";
import settingsRoute from "./routes/settings.routes.js";
import { apiLimiter } from "./middleware/rateLimit.middleware.js";

const app = express();

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}

app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URI || "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", apiLimiter);

app.use("/api/auth", authRoute);
app.use("/api/staff", staffRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/tasks/:taskId/comment", taskCommentRoute);
app.use("/api/notes", notesRoute);
app.use("/api/settings", settingsRoute);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found!"
    });
});

app.use((error, req, res, next) => {
    console.error("Error occurred >> ", error);

    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Unauthorized Action!"
        });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid request data!"
        });
    }

    const status = error.status || 500;
    const isProd = process.env.NODE_ENV === "production";
    const message = status >= 500 && isProd
        ? "Something went wrong!"
        : (error.message || "Something went wrong!");

    return res.status(status).json({
        success: false,
        message
    });
});

export default app;
