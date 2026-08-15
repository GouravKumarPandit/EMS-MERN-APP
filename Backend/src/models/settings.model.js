import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
    company_name: {
        type: String,
        require: true,
        trim: true,
    },
    company_email: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 50,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    }, 
    company_phone: {
        type: String,
        require: true,
        minlength: 10,
        maxlength: 15
    },
});

export const Setting = mongoose.model("Setting", settingSchema);