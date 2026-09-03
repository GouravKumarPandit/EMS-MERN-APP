import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            maxlength: 15,
            trim: true,
        },
        last_name: {
            type: String,
            required: true,
            maxlength: 15,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 15,
            trim: true,
            lowercase: true,
            unique: true,
            match: /^[a-zA-Z0-9_]+$/
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 50,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        dialcode: {
            type: Number,
            default: 91
        },
        phone_number: {
            type: String,
            required: true,
            match: [/^\d{10}$/, "Phone number must be 10 digits"]
        },
        gender: {
            type: String,
            enum: ["male", "female", "others"],
            default: "male",
        },
        dob: {
            type: Date,
        },
        role: {
            type: String,
            enum: ["admin", "staff"],
            default: "staff",
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.toJSON = function () {
    const userObj = this.toObject();
    delete userObj.password;

    return userObj;
};

export const User = mongoose.model("User", userSchema);