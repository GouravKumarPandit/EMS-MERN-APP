/**
 * One-time script to create the first admin user.
 * Usage: node scripts/seedAdmin.js
 */
import dotenv from "dotenv"
dotenv.config();

import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const ADMIN = {
    first_name: "Gourav",
    last_name: "Pandit",
    username: "gouravpandit27",
    password: "12345678",
    email: "panditgourav452@gmail.com",
    dialcode: 91,
    phone_number: "8235518944",
    gender: "male",
    role: "admin",
};

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await User.findOne({ username: ADMIN.username });
    if (exists) {
        console.log(`User "${ADMIN.username}" already exists. Skipping.`);
        process.exit(0);
    }

    await User.create(ADMIN);
    console.log("Admin user created successfully!");
    console.log(`  Username: ${ADMIN.username}`);
    console.log(`  Password: ${ADMIN.password}`);
    console.log(`  Role: ${ADMIN.role}`);
    console.log("\nLog in at http://localhost:5173/admin/login");

    await mongoose.disconnect();
}

seed().catch((err) => {
    console.error("Seed failed:", err.message);
    process.exit(1);
});
