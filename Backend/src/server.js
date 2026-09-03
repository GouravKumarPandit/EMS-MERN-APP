import dotenv from "dotenv"
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is required in environment variables.");
    process.exit(1);
}

if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is required in environment variables.");
    process.exit(1);
}

["SIGINT", "SIGTERM", "SIGQUIT"].forEach(signal => {
    process.on(signal, async () => {
        console.log(`Received ${signal}`);

        await mongoose.connection.close();

        console.log("DB disconnected!");
        process.exit(0);
    });
});

const connectServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

connectServer();
