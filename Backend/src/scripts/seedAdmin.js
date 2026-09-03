/**
 * One-time script to create the first admin user.
 * Usage: node src/scripts/seedAdmin.js
 *
 * Set ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_EMAIL in Backend/.env
 */
import dotenv from "dotenv"
dotenv.config();

import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const ADMIN = {
    first_name: process.env.ADMIN_FIRST_NAME || "Admin",
    last_name: process.env.ADMIN_LAST_NAME || "User",
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "ChangeMe@123",
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    dialcode: 91,
    phone_number: process.env.ADMIN_PHONE || "9999999999",
    gender: "male",
    role: "admin",
};

async function seed() {
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is required.");
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);

    const exists = await User.findOne({ username: ADMIN.username.toLowerCase() });
    if (exists) {
        console.log(`User "${ADMIN.username}" already exists. Skipping.`);
        process.exit(0);
    }

    await User.create(ADMIN);
    console.log("Admin user created successfully!");
    console.log(`  Username: ${ADMIN.username}`);
    console.log("  Password: (from ADMIN_PASSWORD env, or default ChangeMe@123)");
    console.log(`  Role: ${ADMIN.role}`);
    console.log("\nLog in at http://localhost:5173/login");
    console.log("Change the default password after first login.");

    await mongoose.disconnect();
}

seed().catch((err) => {
    console.error("Seed failed:", err.message);
    process.exit(1);
});
