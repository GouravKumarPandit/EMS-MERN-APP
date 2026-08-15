import asyncHandler from "../utils/asyncHandler.js";
import { Setting } from "../models/settings.model.js";

export const updateSettings = asyncHandler(async (req, res, next) => {
    const { company_name, company_email, company_phone } = req.body;

    const settings = await Setting.findOneAndUpdate(
        {},
        {
            company_name,
            company_email,
            company_phone
        },
        {
            new: true,
            upsert: true,
            runValidators: true
        }
    );

    return res.status(200).json({
        success: true,
        message: "Settings updated successfully!",
        data: settings
    });
});