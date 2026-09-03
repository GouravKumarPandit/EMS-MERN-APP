import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        trim: true,
    },
    company_email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },
    company_phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    privacy_policy: {
        type: String,
        default: "",
        maxlength: 20000,
        trim: true,
    },
    terms_of_service: {
        type: String,
        default: "",
        maxlength: 20000,
        trim: true,
    },
});

export const Setting = mongoose.model("Setting", settingSchema);
