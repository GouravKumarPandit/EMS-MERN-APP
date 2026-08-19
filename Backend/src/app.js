import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import staffRoute from "./routes/user.routes.js";
import taskRoute from "./routes/task.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URI || "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/staff", staffRoute);
app.use("/api/tasks", taskRoute);

app.use((req, res) => {
    res.status(400).json({
        success: false,
        message: "Route not found!"
    });
});

app.use((error, req, res, next) => {
    console.log("Error occurred >> ", error);

    const status = error.status || 500;

    return res.status(status).json({
        success: false,
        message: error.message || "Something went wrong!"
    });
})

export default app;
